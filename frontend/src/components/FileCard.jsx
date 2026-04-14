import { FileText, GripVertical, Presentation, X } from "lucide-react";

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;
  return `${value.toFixed(value >= 100 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export function FileCard({
  item,
  onRemove,
  dragAttributes,
  dragListeners,
  isDragging = false,
  overlay = false,
  isOver = false
}) {
  const isPdf = item.file.name.toLowerCase().endsWith(".pdf");
  const TypeIcon = isPdf ? FileText : Presentation;
  const cardClass = `rb-file-card ${isDragging ? "rb-file-card-dragging" : ""} ${overlay ? "rb-file-card-overlay" : ""} ${isOver ? "rb-file-card-over" : ""}`;

  const content = (
    <div className="rb-file-row">
      <button type="button" className="rb-file-drag" aria-label="Drag to reorder" {...dragAttributes} {...dragListeners}>
        <GripVertical className="h-4 w-4" />
      </button>

      <div className={`rb-file-icon ${isPdf ? "rb-file-icon-pdf" : "rb-file-icon-ppt"}`}>
        <TypeIcon className="h-4 w-4" />
      </div>

      <div className="rb-file-meta">
        <p className="rb-file-name">{item.file.name}</p>
        <p className="rb-file-size">{formatBytes(item.file.size)}</p>
      </div>

      {!overlay && (
        <button type="button" className="rb-file-btn" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.file.name}`}>
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  if (overlay) {
    return <div className={cardClass}>{content}</div>;
  }

  return (
    <div className={`rb-file-shell ${isDragging ? "rb-file-shell-dragging" : ""}`}>
      <div className={cardClass}>{content}</div>
    </div>
  );
}
