import { AnimatePresence, motion } from "framer-motion";

import { Progress } from "@/components/ui/progress";

const STAGE_LABELS = {
  idle: "Ready",
  uploading: "Uploading",
  converting: "Converting",
  merging: "Merging",
  done: "Done"
};

const ORDER = ["uploading", "converting", "merging", "done"];

export function ProgressBar({ stage, progress }) {
  const activeStep = ORDER.indexOf(stage);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm font-medium"
          >
            {STAGE_LABELS[stage] || "Ready"}
          </motion.p>
        </AnimatePresence>
        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} />
      <div className="grid grid-cols-4 gap-2">
        {ORDER.map((step, index) => {
          const isActive = activeStep >= index;
          return (
            <motion.div
              key={step}
              layout
              className="rounded-md border px-2 py-1 text-center text-xs"
              animate={{
                borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                backgroundColor: isActive ? "hsl(var(--primary) / 0.08)" : "transparent"
              }}
              transition={{ duration: 0.2 }}
            >
              {STAGE_LABELS[step]}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
