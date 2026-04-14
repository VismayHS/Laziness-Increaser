import { AnimatedButton } from "@/components/AnimatedButton";

const STEPS = ["Uploading", "Converting", "Merging", "Done"];

function getActiveStep(stage) {
  if (stage === "uploading") return 0;
  if (stage === "converting") return 1;
  if (stage === "merging") return 2;
  if (stage === "done") return 3;
  return -1;
}

export function StatusPanel({ stage, progress, itemCount, isProcessing, canProcess, onProcess, onClear }) {
  const activeStep = getActiveStep(stage);
  const boundedProgress = Math.max(0, Math.min(progress, 100));

  return (
    <aside className="rb-status-panel">
      <div className="rb-status-head">
        <p className="rb-status-kicker">Process Status</p>
        <p className="rb-status-meta">{itemCount} file{itemCount === 1 ? "" : "s"} in queue</p>
      </div>

      <ol className="rb-status-steps" aria-label="Processing steps">
        {STEPS.map((label, index) => {
          const active = index === activeStep;
          return (
            <li key={label} className={`rb-status-step ${active ? "is-active" : ""}`}>
              <span className="rb-step-dot" aria-hidden="true" />
              <span>{label}</span>
            </li>
          );
        })}
      </ol>

      <div className="rb-progress-wrap" role="status" aria-live="polite">
        <div className="rb-progress-track">
          <div className="rb-progress-fill" style={{ width: `${boundedProgress}%` }} />
        </div>
        <p className="rb-progress-label">{Math.round(boundedProgress)}%</p>
      </div>

      <div className="mt-5 grid gap-2.5">
        <AnimatedButton onClick={onProcess} disabled={!canProcess || isProcessing}>
          {isProcessing ? "Processing..." : "Convert + Merge"}
        </AnimatedButton>
        <AnimatedButton variant="secondary" onClick={onClear} disabled={itemCount === 0 || isProcessing}>
          Clear Queue
        </AnimatedButton>
      </div>
    </aside>
  );
}
