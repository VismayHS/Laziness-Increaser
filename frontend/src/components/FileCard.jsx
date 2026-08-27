import { ChevronLeft, ChevronRight, FileText, FileType2, Presentation, X } from "lucide-react";

const SLIDE_EXTENSIONS = [".ppt", ".pptx", ".odp"];

function describeKind(name) {
  const lower = name.toLowerCase();

  if (lower.endsWith(".pdf")) {
    return { icon: FileText, variant: "pdf", label: "PDF" };
  }

  if (SLIDE_EXTENSIONS.some((extension) => lower.endsWith(extension))) {
    return { icon: Presentation, variant: "ppt", label: "Slides" };
  }

  return { icon: FileType2, variant: "doc", label: "Document" };
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;
  return `${value.toFixed(value >= 100 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

// Buttons sit inside the drag surface. The sortable listeners activate on
// mousedown/touchstart, so both must be stopped here — stopping only pointerdown
// would still let a small drag off a button hijack the click.
const stopDragStart = {
  onPointerDown: (event) => event.stopPropagation(),
  onMouseDown: (event) => event.stopPropagation(),
  onTouchStart: (event) => event.stopPropagation()
};

export function FileCard({
  item,
  index,
  total,
  onRemove,
  onMove,
  dragAttributes,
  dragListeners,
  isDragging = false,
  overlay = false
}) {
  const { icon: TypeIcon, variant, label } = describeKind(item.file.name);

  const cardClass = [
    "rb-file-card",
    `rb-file-card-${variant}`,
    isDragging ? "rb-file-card-dragging" : "",
    overlay ? "rb-file-card-overlay" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className={cardClass} {...dragAttributes} {...dragListeners}>
      <div className="rb-file-top">
        <span className="rb-file-index" aria-label={`Position ${index + 1} of ${total}`}>
          {index + 1}
        </span>

        {!overlay && (
          <button
            type="button"
            className="rb-file-remove"
            {...stopDragStart}
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.file.name}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className={`rb-file-thumb rb-file-icon-${variant}`}>
        <TypeIcon className="h-7 w-7" />
        <span className="rb-file-kind">{label}</span>
      </div>

      <div className="rb-file-meta">
        <p className="rb-file-name" title={item.file.name}>
          {item.file.name}
        </p>
        <p className="rb-file-size">{formatBytes(item.file.size)}</p>
      </div>

      {!overlay && (
        <div className="rb-file-nudge">
          <button
            type="button"
            className="rb-file-btn"
            {...stopDragStart}
            onClick={() => onMove(index, index - 1)}
            disabled={isFirst}
            aria-label={`Move ${item.file.name} earlier`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rb-file-btn"
            {...stopDragStart}
            onClick={() => onMove(index, index + 1)}
            disabled={isLast}
            aria-label={`Move ${item.file.name} later`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
