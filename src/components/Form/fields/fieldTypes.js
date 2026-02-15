// Shared field contract helpers and base settings

export const BASIC_SETTINGS = [
  { key: 'label', path: 'label', type: 'text', label: 'Label', category: 'Basic' },
  { key: 'name', path: 'name', type: 'text', label: 'Name (field key)', category: 'Basic' },
  { key: 'placeholder', path: 'placeholder', type: 'text', label: 'Placeholder', category: 'Basic' },
];

export const VALIDATION_SETTINGS = [
  { key: 'required', path: 'required', type: 'boolean', label: 'Required', category: 'Validation' },
  { key: 'min', path: 'validation.min', type: 'number', label: 'Min', category: 'Validation' },
  { key: 'max', path: 'validation.max', type: 'number', label: 'Max', category: 'Validation' },
  { key: 'pattern', path: 'validation.pattern', type: 'text', label: 'Pattern (regex)', category: 'Validation' },
];

export const DATA_SETTINGS = [
  { key: 'defaultValue', path: 'defaultValue', type: 'text', label: 'Default value', category: 'Data' },
];

export const UI_SETTINGS = [
  { key: 'width', path: 'ui.width', type: 'number', label: 'Width (%)', category: 'UI' },
  { key: 'hidden', path: 'ui.hidden', type: 'boolean', label: 'Hidden', category: 'UI' },
  { key: 'disabled', path: 'ui.disabled', type: 'boolean', label: 'Disabled', category: 'UI' },
];

export const LOGIC_SETTINGS = [
  {
    key: 'logicField',
    path: 'logic.visibleWhen.field',
    type: 'text',
    label: 'Visible when field',
    category: 'Logic',
  },
  {
    key: 'logicOperator',
    path: 'logic.visibleWhen.operator',
    type: 'select',
    label: 'Operator',
    category: 'Logic',
    options: [
      { value: 'equals', label: 'Equals' },
      { value: 'not_equals', label: 'Not equals' },
      { value: 'exists', label: 'Exists' },
      { value: 'not_exists', label: 'Not exists' },
    ],
  },
  {
    key: 'logicValue',
    path: 'logic.visibleWhen.value',
    type: 'text',
    label: 'Compare value',
    category: 'Logic',
  },
];
// Advanced settings have been removed from the builder UI,
// but we keep the exported array (empty) so existing imports work.
export const ADVANCED_SETTINGS = [];
// simple path helpers
const getByPath = (obj, path) => {
  if (!path) return undefined;
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

const setByPath = (obj, path, value) => {
  const parts = path.split('.');
  const next = { ...obj };
  let cur = next;
  parts.forEach((p, idx) => {
    if (idx === parts.length - 1) {
      cur[p] = value;
    } else {
      cur[p] = cur[p] ? { ...cur[p] } : {};
      cur = cur[p];
    }
  });
  return next;
};

export const fieldHelpers = { getByPath, setByPath };

