import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  closestCorners,
  DragOverlay, // Import DragOverlay
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import './Form.css';
import { FIELD_REGISTRY } from './fields/FieldRegistry';


const Form = ({ formopen }) => {


  const [rows, setRows] = useState([]);
  const [activeDragItem, setActiveDragItem] = useState(null); // Track the full object being dragged
  const [values, setValues] = useState({});
  const [settingsFieldId, setSettingsFieldId] = useState(null);
  const [settingsPos, setSettingsPos] = useState({ x: 80, y: 80 });

  const FIELD_TYPES = useMemo(() => {
    return Object.values(FIELD_REGISTRY).map((entry) => ({
      type: entry.type,
      label: entry.schema?.label ?? entry.type,
    }));
  }, []);

  const activeSettingsField = useMemo(() => {
    if (!settingsFieldId) return null;
    for (const row of rows) {
      const found = row.find((f) => f.id === settingsFieldId);
      if (found) return found;
    }
    return null;
  }, [rows, settingsFieldId]);

  const updateFieldConfig = (fieldId, nextField) => {
    setRows((prev) =>
      prev.map((row) =>
        row.map((f) => (f.id === fieldId ? { ...nextField, id: fieldId } : f))
      )
    );
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const onDragStart = (event) => {
    const { active } = event;
    document.body.classList.add('is-dragging');

    // Determine what we are dragging to render in the Overlay
    let item = null;
    const isPaletteItem = active.id.toString().startsWith('palette-');

    if (isPaletteItem) {
      const type = active.id.replace('palette-', '');
      const reg = FIELD_REGISTRY[type];
      if (reg?.schema) {
        item = {
          ...reg.schema,
          type,
          id: active.id, // Temp ID for overlay
        };
      }
    } else {
      // Find existing field
      for (const row of rows) {
        const found = row.find((f) => f.id === active.id);
        if (found) {
          item = found;
          break;
        }
      }
    }
    setActiveDragItem(item);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragItem(null);
    document.body.classList.remove('is-dragging');

    if (!over) return;

    setRows((prev) => {
      let itemToMove;
      const isPaletteItem = active.id.toString().startsWith('palette-');

      // 1. Get the Item Data
      if (isPaletteItem) {
        const type = active.id.replace('palette-', '');
        const reg = FIELD_REGISTRY[type];
        if (!reg?.schema) return prev;
        const ts = Date.now();
        itemToMove = {
          ...reg.schema,
          type,
          id: `field-${ts}`,
          // make the default name unique-ish to avoid duplicates
          name: `${reg.schema.name || type}_field_${ts}`,
        };
      } else {
        // Find existing
        for (const row of prev) {
          const found = row.find((f) => f.id === active.id);
          if (found) {
            itemToMove = { ...found };
            break;
          }
        }
      }

      if (!itemToMove) return prev;

      // 2. Remove from old position
      const cleanedRows = prev
        .map((row) => row.filter((f) => f.id !== active.id))
        .filter((row) => row.length > 0);

      // 3. Handle Canvas Bottom Drop
      if (over.id === 'canvas-bottom') {
        return [...cleanedRows, [itemToMove]];
      }

      // 4. Identify Target
      const [direction, targetId] = over.id.split(':');
      
      // Prevent self-drop quirks
      if (!isPaletteItem && active.id === targetId) return prev;

      // 5. Find Target Location
      let targetRIdx = -1;
      let targetCIdx = -1;

      cleanedRows.forEach((row, r) => {
        const c = row.findIndex((f) => f.id === targetId);
        if (c !== -1) {
          targetRIdx = r;
          targetCIdx = c;
        }
      });

      // Fallback
      if (targetRIdx === -1) return [...cleanedRows, [itemToMove]];

      const newRows = [...cleanedRows];

      // 6. Insert logic
      if (direction === 'left') {
        newRows[targetRIdx].splice(targetCIdx, 0, itemToMove);
      } else if (direction === 'right') {
        newRows[targetRIdx].splice(targetCIdx + 1, 0, itemToMove);
      } else if (direction === 'top') {
        newRows.splice(targetRIdx, 0, [itemToMove]);
      } else if (direction === 'bottom') {
        newRows.splice(targetRIdx + 1, 0, [itemToMove]);
      }

      return newRows;
    });
  };

  const handleDelete = (id) => {
    setRows(prev => prev.map(row => row.filter(f => f.id !== id)).filter(row => row.length > 0));
    setValues((prev) => {
      if (!prev || !(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSettingsFieldId((prev) => (prev === id ? null : prev));
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragStart={onDragStart} 
      onDragEnd={onDragEnd}
    >
      <div className={`form-builder-layout ${activeDragItem ? 'layout-dragging' : ''}`}>
        
        {/* Sidebar */}
        <div className="palette-container">
          <h4>Components</h4>
          <div className="palette-list">
            {FIELD_TYPES.map((f) => (
              <PaletteItem key={f.type} {...f} />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="canvas-container">
          {rows.length === 0 && (
            <div className="empty-state">
              Drag items here to start
            </div>
          )}

          {rows.map((row, rIdx) => (
            <div key={`row-${rIdx}`} className="canvas-row">
              {row.map((field) => (
                <DraggableField 
                  key={field.id} 
                  field={field} 
                  value={values[field.id]}
                  onValueChange={(nextValue) =>
                    setValues((prev) => ({ ...prev, [field.id]: nextValue }))
                  }
                  onOpenSettings={() => {
                    setSettingsFieldId(field.id);
                  }}
                  onDelete={() => handleDelete(field.id)}
                />
              ))}
            </div>
          ))}

          <DropZone id="canvas-bottom" className="canvas-bottom-zone">
            Drop here for a new row
          </DropZone>
        </div>

      </div>

      {/* DRAG OVERLAY: 
        This renders the "flying" version of the card.
        The original card stays in the grid (ghosted) to maintain layout stability.
      */}
      <DragOverlay dropAnimation={null}>
        {activeDragItem ? (
           <div className="field-card overlay-card">
              <div className="field-header">
                <span className="drag-handle">::</span>
                <span className="field-label">{activeDragItem.label ?? activeDragItem.type}</span>
              </div>
              <div className="field-body">
                <FieldRenderer field={activeDragItem} value={undefined} onChange={() => {}} />
              </div>
           </div>
        ) : null}
      </DragOverlay>

      {settingsFieldId && activeSettingsField && (
        <DraggableSettingsPopup
          title={`${activeSettingsField.label ?? activeSettingsField.type} settings`}
          pos={settingsPos}
          onPosChange={setSettingsPos}
          onClose={() => setSettingsFieldId(null)}
        >
          <FieldSettingsPanel
            field={activeSettingsField}
            onChange={(nextField) => updateFieldConfig(activeSettingsField.id, nextField)}
          />
        </DraggableSettingsPopup>
      )}

    </DndContext>
  );
};

// --- Sub Components ---

const DraggableField = ({ field, value, onValueChange, onOpenSettings, onDelete }) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: field.id,
  });

  // NOTE: We do NOT apply 'transform' here. 
  // We want the item to stay in the grid to hold the hitboxes in place.
  // The DragOverlay handles the visual movement.
  const style = {
    opacity: isDragging ? 0.3 : 1, // Ghost effect
  };

  return (
    <div ref={setNodeRef} style={style} className="field-wrapper">
      <div className="field-card">
        <div className="field-header">
          <div className="drag-handle" {...attributes} {...listeners}>
            :: 
          </div>
          <div className="field-actions">
            <button
              type="button"
              className="settings-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSettings?.();
              }}
              title="Settings"
              aria-label="Field settings"
            >
              ⚙
            </button>
            <button type="button" className="delete-btn" onClick={onDelete}>×</button>
          </div>
        </div>
        <div className="field-body">
           <FieldRenderer field={field} value={value} onChange={onValueChange} />
        </div>
      </div>

      {/* Hitboxes are always here, stable, and waiting for the cursor */}
      <DropZone id={`left:${field.id}`} className="zone zone-left" />
      <DropZone id={`right:${field.id}`} className="zone zone-right" />
      <DropZone id={`top:${field.id}`} className="zone zone-top" />
      <DropZone id={`bottom:${field.id}`} className="zone zone-bottom" />
    </div>
  );
};

const PaletteItem = ({ type, label }) => {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `palette-${type}`,
  });

  // Palette items also don't move; they spawn an overlay
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="palette-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {label}
    </div>
  );
};

const DropZone = ({ id, className, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div 
      ref={setNodeRef} 
      className={`${className} ${isOver ? 'is-over' : ''}`}
    >
      {children}
    </div>
  );
};

const FieldRenderer = ({ field, value, onChange }) => {
  const registryEntry = FIELD_REGISTRY[field.type];
  const Component = registryEntry?.Component;
  if (!Component) return null;

  const isHidden = Boolean(field?.ui?.hidden);

  // In the builder, we still want hidden fields to be visible for editing,
  // but visually "muted". Many field components return null when hidden.
  const safeField = {
    ...field,
    ui: {
      ...(field.ui ?? {}),
      hidden: false,
    },
  };

  return (
    <div className={isHidden ? 'fb-hidden-preview' : ''}>
      <Component field={safeField} value={value} onChange={onChange} />
    </div>
  );
};

const FieldSettingsPanel = ({ field, onChange }) => {
  const registryEntry = FIELD_REGISTRY[field.type];
  const SettingsPanel = registryEntry?.SettingsPanel;
  if (!SettingsPanel) return null;
  return <SettingsPanel field={field} onChange={onChange} />;
};

const DraggableSettingsPopup = ({ title, pos, onPosChange, onClose, children }) => {
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!draggingRef.current) return;
      onPosChange({
        x: Math.max(0, e.clientX - offsetRef.current.x),
        y: Math.max(0, e.clientY - offsetRef.current.y),
      });
    };
    const onMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onPosChange]);

  return (
    <div className="settings-popup" style={{ left: pos.x, top: pos.y }}>
      <div
        className="settings-popup-header"
        onMouseDown={(e) => {
          draggingRef.current = true;
          offsetRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        }}
      >
        <div className="settings-popup-title">{title}</div>
        <button type="button" className="settings-popup-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <div className="settings-popup-body">{children}</div>
    </div>
  );
};

export default Form;