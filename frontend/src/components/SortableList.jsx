import { useMemo } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FileCard } from "@/components/FileCard";

function SortableItem({ item, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id: item.id,
    transition: {
      duration: 190,
      easing: "cubic-bezier(0.22, 0.9, 0.3, 1)"
    }
  });

  const adjustedTransform = transform
    ? {
        ...transform,
        x: 0,
        scaleX: 1,
        scaleY: 1
      }
    : null;

  const style = {
    transform: CSS.Transform.toString(adjustedTransform),
    transition: transition || "transform 190ms cubic-bezier(0.22, 0.9, 0.3, 1), opacity 150ms ease"
  };

  return (
    <li ref={setNodeRef} style={style} className={`rb-sortable-item ${isDragging ? "is-dragging" : ""}`}>
      <FileCard
        item={item}
        onRemove={onRemove}
        dragAttributes={attributes}
        dragListeners={listeners}
        isDragging={isDragging}
        isOver={isOver && !isDragging}
      />
    </li>
  );
}

export function SortableList({ items, onReorder, onRemove }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        onReorder(arrayMove(items, oldIndex, newIndex));
      }}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <ul className="rb-file-list">
          {items.map((item) => (
            <SortableItem key={item.id} item={item} onRemove={onRemove} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
