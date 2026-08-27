import { useCallback, useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FileCard } from "@/components/FileCard";

function SortableItem({ item, index, total, onRemove, onMove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    transition: {
      duration: 220,
      easing: "cubic-bezier(0.22, 0.9, 0.3, 1)"
    }
  });

  const style = {
    // The lifted card is drawn by DragOverlay, so the original tile stays in the
    // grid as a dimmed placeholder rather than moving with the cursor.
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1
  };

  return (
    <li ref={setNodeRef} style={style} className="rb-sortable-item">
      <FileCard
        item={item}
        index={index}
        total={total}
        onRemove={onRemove}
        onMove={onMove}
        dragAttributes={attributes}
        dragListeners={listeners}
        isDragging={isDragging}
      />
    </li>
  );
}

export function SortableList({ items, onReorder, onRemove }) {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    // A small distance threshold lets the remove and nudge buttons register a
    // plain click before the card decides the gesture is a drag.
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 160, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const activeIndex = activeId ? items.findIndex((item) => item.id === activeId) : -1;
  const activeItem = activeIndex === -1 ? null : items[activeIndex];

  const move = useCallback(
    (from, to) => {
      if (to < 0 || to >= items.length || from === to) return;
      onReorder(arrayMove(items, from, to));
    },
    [items, onReorder]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={({ active, over }) => {
        setActiveId(null);
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        onReorder(arrayMove(items, oldIndex, newIndex));
      }}
    >
      <SortableContext items={itemIds} strategy={rectSortingStrategy}>
        <ul className="rb-file-grid">
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              item={item}
              index={index}
              total={items.length}
              onRemove={onRemove}
              onMove={move}
            />
          ))}
        </ul>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.22, 0.9, 0.3, 1)" }}>
        {activeItem ? (
          <FileCard item={activeItem} index={activeIndex} total={items.length} overlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
