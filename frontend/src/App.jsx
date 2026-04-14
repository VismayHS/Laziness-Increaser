import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { DropzoneCard } from "@/components/DropzoneCard";
import { GradientHeading } from "@/components/GradientHeading";
import { StatusPanel } from "@/components/StatusPanel";
import { SortableList } from "@/components/SortableList";
import TextType from "@/reactbits/TextType";

import "@/styles/reactbits-overrides.css";

const ACCEPTED = new Set([".pdf", ".ppt", ".pptx"]);

function createFileId(file) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${file.name}-${Math.random().toString(16).slice(2)}`;
}

function getExt(name) {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function App() {
  const [items, setItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState(0);

  const hasFiles = items.length > 0;

  const sortedCountLabel = useMemo(() => `${items.length} file${items.length === 1 ? "" : "s"} ready`, [items.length]);

  function addFiles(files) {
    if (!files || files.length === 0) return;

    let rejectedCount = 0;
    const nextItems = [];

    for (const file of files) {
      const ext = getExt(file.name);
      if (!ACCEPTED.has(ext)) {
        rejectedCount += 1;
        continue;
      }

      nextItems.push({
        id: createFileId(file),
        file
      });
    }

    if (nextItems.length > 0) {
      setItems((prev) => [...prev, ...nextItems]);
      toast.success(`Added ${nextItems.length} file${nextItems.length > 1 ? "s" : ""}`);
    }

    if (rejectedCount > 0) {
      toast((t) => (
        <div className="text-sm">
          Ignored {rejectedCount} unsupported file{rejectedCount > 1 ? "s" : ""}
          <button className="ml-2 text-primary" onClick={() => toast.dismiss(t.id)}>
            close
          </button>
        </div>
      ));
    }
  }

  function removeFile(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleProcess() {
    if (!hasFiles) {
      toast.error("Please upload at least one file.");
      return;
    }

    setIsProcessing(true);
    setStage("uploading");
    setProgress(20);

    try {
      const formData = new FormData();
      for (const item of items) {
        formData.append("files", item.file, item.file.name);
      }

      const request = fetch("/process", {
        method: "POST",
        body: formData
      });

      await sleep(280);
      setStage("converting");
      setProgress(55);

      await sleep(320);
      setStage("merging");
      setProgress(82);

      const response = await request;
      if (!response.ok) {
        let errorMessage = "Failed to process files.";
        try {
          const payload = await response.json();
          if (payload?.error) errorMessage = payload.error;
        } catch {
          // Use fallback message.
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "merged-output.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      setStage("done");
      setProgress(100);
      toast.success("Merged PDF downloaded.");
    } catch (error) {
      setStage("idle");
      setProgress(0);
      toast.error(error?.message || "Something went wrong.");
    } finally {
      await sleep(220);
      setIsProcessing(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />

      <main className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <header className="mb-8 border-b border-white/10 pb-6">
          <GradientHeading />
          <p className="mt-3 max-w-2xl text-sm text-slate-400">
            Upload PPT, PPTX, or PDF files, reorder your queue, and export one merged PDF.
          </p>

          <div className="rb-credit-wrap mt-4">
            <TextType
              as="p"
              className="rb-credit-line"
              text={[
                "Made by Vismay H S",
                "Built for smooth PPT/PPTX + PDF merge workflows"
              ]}
              typingSpeed={75}
              deletingSpeed={50}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              variableSpeedEnabled={false}
              cursorBlinkDuration={0.5}
            />
            <p className="rb-host-note">
              LibreOffice must be installed for PPT/PPTX conversion from{" "}
              <a
                href="https://www.libreoffice.org/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-host-note-link"
              >
                libreoffice.org/download
              </a>
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
          <section className="space-y-5">
            <DropzoneCard onFilesAdded={addFiles} disabled={isProcessing} />

            {hasFiles ? (
              <section className="rb-queue-shell">
                <div className="rb-queue-head">
                  <p className="rb-queue-title">Merge Queue</p>
                  <p className="rb-queue-meta">{sortedCountLabel}</p>
                </div>
                <SortableList items={items} onReorder={setItems} onRemove={removeFile} />
              </section>
            ) : (
              <div className="rb-empty-queue">
                Queue is empty. Add files above, then drag to reorder before merging.
              </div>
            )}
          </section>

          <StatusPanel
            stage={stage}
            progress={progress}
            itemCount={items.length}
            isProcessing={isProcessing}
            canProcess={hasFiles}
            onProcess={handleProcess}
            onClear={() => setItems([])}
          />
        </div>
      </main>
    </div>
  );
}
