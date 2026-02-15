import React from 'react';
import './FieldStyles.css';
import {
  BASIC_SETTINGS,
  DATA_SETTINGS,
  UI_SETTINGS,
  LOGIC_SETTINGS,
  ADVANCED_SETTINGS,
 
} from './fieldTypes';
import SettingsForm from './SettingsForm';

export const schema = {
  id: '',
  type: 'checkbox',
  label: 'Checkboxes',
  name: 'checkbox_field',
  required: false,
  defaultValue: [],
  validation: {},
  options: {
    choices: [
      { value: 'option_1', label: 'Option 1' },
      { value: 'option_2', label: 'Option 2' },
    ],
  },
  ui: { width: 100, hidden: false, disabled: false },
  logic: { visibleWhen: null },
  advanced: { className: '', helpText: '' },
};

export const settingsSchema = [
  ...BASIC_SETTINGS,
  ...DATA_SETTINGS,
  {
    key: 'choices',
    path: 'options.choices',
    type: 'text',
    label: 'Options (comma-separated value:label)',
    category: 'Data',
  },
  ...UI_SETTINGS,
  ...LOGIC_SETTINGS,
  ...ADVANCED_SETTINGS,
];

export const SettingsPanel = ({ field, onChange }) => {
  const normalized = {
    ...field,
    options: {
      ...field.options,
      choices: field.options?.choices || [],
    },
  };

  const handleChange = (updatedField) => {
    const cfg = { ...updatedField };
    cfg.options = cfg.options ? { ...cfg.options } : { choices: [] };
    const entry = settingsSchema.find((s) => s.key === 'choices');
    if (entry) {
      const raw = cfg.options?.choices;
      if (typeof raw === 'string') {
        cfg.options.choices = raw
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean)
          .map((pair, idx) => {
            const [val, lab] = pair.split(':').map((s) => s?.trim());
            return {
              value: val || `option_${idx + 1}`,
              label: lab || val || `Option ${idx + 1}`,
            };
          });
      }
    }
    onChange(cfg);
  };

  const fieldForForm = {
    ...normalized,
    options: {
      ...normalized.options,
      choices: normalized.options.choices
        .map((c) => `${c.value}:${c.label}`)
        .join(', '),
    },
  };

  return (
    <SettingsForm schema={settingsSchema} field={fieldForForm} onFieldChange={handleChange} />
  );
};

const CheckboxField = ({ field, value, onChange }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;
  const choices = field.options?.choices || [];
  const selected = Array.isArray(value) ? value : field.defaultValue || [];

  const toggle = (val, checked) => {
    const next = new Set(selected);
    if (checked) next.add(val);
    else next.delete(val);
    onChange(Array.from(next));
  };

  return (
    <div className={`fb-field fb-field-checkbox ${field.advanced?.className || ''}`} style={{ width: `${width}%` }}>
      {field.label && (
        <label>
          {field.label}
          {field.required && <span className="fb-required">*</span>}
        </label>
      )}
      <div>
        {choices.map((opt) => (
          <label key={opt.value} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={(e) => toggle(opt.value, e.target.checked)}
              disabled={field.ui?.disabled}
            />{' '}
            {opt.label}
          </label>
        ))}
      </div>
      {field.advanced?.helpText && <small className="fb-help">{field.advanced.helpText}</small>}
    </div>
  );
};

export default CheckboxField;

