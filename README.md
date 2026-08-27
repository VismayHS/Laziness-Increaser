# Document / PPT / PDF Converter and Merger

Basic local website that does exactly this:

1. Accept multiple documents, slide decks, and PDFs
2. Convert everything that is not already a PDF
3. Merge all PDFs in the same order they were uploaded
4. Download one merged PDF

Any combination works — a `.docx`, a `.pptx`, and a `.pdf` in one queue merge into a
single output.

## Supported file types

| Group | Extensions | Handled by |
| --- | --- | --- |
| Documents | `.doc`, `.docx`, `.odt`, `.rtf`, `.txt` | LibreOffice Writer |
| Presentations | `.ppt`, `.pptx`, `.odp` | LibreOffice Impress |
| PDF | `.pdf` | merged directly, no conversion |

## Requirements

- Node.js 18+
- LibreOffice installed — required for every non-PDF input
  - Windows: make sure `soffice.exe` is in PATH
  - Default install path usually works automatically:
    - `C:\Program Files\LibreOffice\program\soffice.exe`

## Run (recommended)

From the project root:

```bat
start-merger.bat
```

Then open:

```text
http://localhost:10001
```

The script checks what is already running, starts only the missing service, waits for
both to respond, and prints `[ACTIVE]`. It is safe to run repeatedly.

| Service | Port | Started as |
| --- | --- | --- |
| Frontend (Vite dev server) | `10001` | `npm --prefix frontend run dev` |
| Backend (API `/process`) | `10002` | `node server.js` |

The Vite dev server proxies `/process` to the backend, so you only ever open port 10001.

## Run (single server, no dev server)

This builds the frontend and serves it from the Node backend on one port:

```bash
npm install
npm start
```

Then open `http://localhost:10002` — the backend serves `frontend/dist` once it exists.
Override the port with the `PORT` environment variable.

## Usage

1. Choose files directly OR choose a folder.
2. Reorder files in the list (drag and drop or use arrow buttons).
3. Click **Convert and Merge**.
4. Merged PDF downloads automatically.

## React Frontend (Enhanced)

An enhanced React + Tailwind UI is available in `frontend/` with drag-and-drop upload,
sortable file cards, progress UI, toasts, and dark mode. It is what `start-merger.bat`
launches on port 10001.

## Hosting Note (Vercel)

This project uses a Node backend route (`/process`) and LibreOffice (`soffice`) to convert documents and slide decks to PDF.

- End users do **not** need LibreOffice installed.
- The **server host** running the backend must have LibreOffice installed and accessible in PATH.

### Important for Vercel

On standard Vercel serverless deployments, LibreOffice is typically not available, so all non-PDF conversion will fail.

If you still want to use Vercel:

1. Host only the frontend on Vercel, and run backend conversion on another host (VM/container) with LibreOffice.
2. Or limit uploads to PDF-only merge when running fully on Vercel.

## Proper Deployment (Recommended)

Use this architecture:

1. Frontend on Vercel (from `frontend/`)
2. Backend on a host that supports LibreOffice (Render/Railway/VM/Docker)

### 1) Deploy Backend with Docker (LibreOffice included)

This repo now includes:

1. `Dockerfile`
2. `.dockerignore`

You can test locally:

```bash
docker build -t ppt-pdf-merge-app .
docker run --rm -p 10002:10002 ppt-pdf-merge-app
```

Then open `http://localhost:10002`.

When deploying this Docker image to Render/Railway/VM:

1. Expose port `10002` (or set `PORT` and expose that instead)
2. Start command is already in Docker (`node server.js`)

### 2) Deploy Frontend on Vercel

In Vercel:

1. Import this repo
2. Set **Root Directory** to `frontend`
3. Keep the default Vite build settings

This repo includes `frontend/vercel.json` with a rewrite for `/process`.
Before deploy, replace this value:

`https://REPLACE_WITH_YOUR_BACKEND_DOMAIN/process`

with your real backend URL, for example:

`https://ppt-backend.onrender.com/process`

### 3) Final Check

1. Open your Vercel site
2. Upload a mix of documents, slide decks, and PDFs
3. Click **Convert + Merge**
4. If conversion fails, verify backend host has LibreOffice available as `soffice`

## Inspiration

This was inspired by this user's Manifest extension: `https://github.com/Artificialhuman74/`Manifest
