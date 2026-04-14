const express = require("express");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const fsp = require("fs/promises");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

const TEMP_ROOT = path.join(os.tmpdir(), "ppt-pdf-converter-merger");
const ALLOWED_EXTENSIONS = new Set([".pdf", ".ppt", ".pptx"]);
const FRONTEND_DIST = path.join(__dirname, "frontend", "dist");
const LEGACY_PUBLIC = path.join(__dirname, "public");
const CLIENT_ROOT = fs.existsSync(FRONTEND_DIST) ? FRONTEND_DIST : LEGACY_PUBLIC;

fs.mkdirSync(TEMP_ROOT, { recursive: true });

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
}

function fileExists(filePath) {
  return fsp
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

function getLibreOfficeCandidates() {
  if (process.platform === "win32") {
    return [
      "soffice.exe",
      "soffice",
      "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
      "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe"
    ];
  }

  return ["soffice", "/usr/bin/soffice", "/snap/bin/libreoffice"];
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(
        new Error(
          `Command failed with code ${code}.\nstdout: ${stdout || "(empty)"}\nstderr: ${stderr || "(empty)"}`
        )
      );
    });
  });
}

async function convertPptToPdf(inputPath, outputDir) {
  const candidates = getLibreOfficeCandidates();
  let lastError = null;

  for (const candidate of candidates) {
    if (path.isAbsolute(candidate) && !(await fileExists(candidate))) {
      continue;
    }

    try {
      await runCommand(candidate, [
        "--headless",
        "--convert-to",
        "pdf",
        "--outdir",
        outputDir,
        inputPath
      ]);

      const outputPath = path.join(outputDir, `${path.parse(inputPath).name}.pdf`);
      if (await fileExists(outputPath)) {
        return outputPath;
      }

      throw new Error("PPT/PPTX conversion command succeeded but no PDF was produced.");
    } catch (error) {
      lastError = error;

      const message = String(error.message || "").toLowerCase();
      if (message.includes("enoent") || message.includes("not recognized")) {
        continue;
      }
    }
  }

  const installHelp =
    process.platform === "win32"
      ? "LibreOffice is required. Install it and make sure soffice.exe is available in PATH."
      : "LibreOffice is required. Install it and make sure soffice is available in PATH.";

  throw new Error(`${installHelp}\nLast conversion error: ${lastError ? lastError.message : "Unknown error"}`);
}

async function cleanupPaths(paths) {
  await Promise.all(
    paths.map(async (targetPath) => {
      try {
        await fsp.rm(targetPath, { recursive: true, force: true });
      } catch {
        // Ignore cleanup errors.
      }
    })
  );
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, TEMP_ROOT);
  },
  filename: (_req, file, cb) => {
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeName = sanitizeFilename(path.basename(file.originalname));
    cb(null, `${uniquePrefix}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: {
    files: 300,
    fileSize: 200 * 1024 * 1024
  }
});

app.use(express.static(CLIENT_ROOT));

app.post("/process", upload.array("files", 300), async (req, res) => {
  const uploadedFiles = req.files || [];
  const cleanupTargets = [];

  try {
    if (uploadedFiles.length === 0) {
      res.status(400).json({ error: "Upload at least one .ppt, .pptx, or .pdf file." });
      return;
    }

    const unsupported = uploadedFiles.filter((file) => {
      const extension = path.extname(file.originalname || "").toLowerCase();
      return !ALLOWED_EXTENSIONS.has(extension);
    });

    if (unsupported.length > 0) {
      res.status(400).json({
        error: `Unsupported files detected: ${unsupported.map((file) => file.originalname).join(", ")}`
      });
      return;
    }

    for (const file of uploadedFiles) {
      cleanupTargets.push(file.path);
    }

    const outputDir = await fsp.mkdtemp(path.join(TEMP_ROOT, "job-"));
    cleanupTargets.push(outputDir);

    const orderedPdfPaths = [];

    for (const file of uploadedFiles) {
      const extension = path.extname(file.originalname || "").toLowerCase();
      if (extension === ".pdf") {
        orderedPdfPaths.push(file.path);
        continue;
      }

      const convertedPdfPath = await convertPptToPdf(file.path, outputDir);
      orderedPdfPaths.push(convertedPdfPath);
    }

    const mergedDocument = await PDFDocument.create();

    for (const pdfPath of orderedPdfPaths) {
      const pdfBytes = await fsp.readFile(pdfPath);
      const sourcePdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedDocument.copyPages(sourcePdf, sourcePdf.getPageIndices());

      for (const page of copiedPages) {
        mergedDocument.addPage(page);
      }
    }

    const mergedBytes = await mergedDocument.save();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="merged-${timestamp}.pdf"`);
    res.send(Buffer.from(mergedBytes));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "Failed to convert and merge files."
    });
  } finally {
    await cleanupPaths(cleanupTargets);
  }
});

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/process")) {
    next();
    return;
  }

  res.sendFile(path.join(CLIENT_ROOT, "index.html"), (error) => {
    if (error) {
      next(error);
    }
  });
});

app.use((err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ error: "One or more files exceed the 200MB limit." });
      return;
    }

    res.status(400).json({ error: err.message });
    return;
  }

  next(err);
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    console.error(`If the app is already running, open http://localhost:${PORT}`);
    console.error("Otherwise, stop the process using that port and run npm.cmd start again.");
    process.exit(1);
  }

  console.error("Failed to start server:", error);
  process.exit(1);
});
