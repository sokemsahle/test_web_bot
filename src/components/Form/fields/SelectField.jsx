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
  type: 'select',
  label: 'Select',
  name: 'select_field',
  required: false,
  placeholder: '',
  defaultValue: '',
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

const SelectField = ({ field, value, onChange }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;
  const choices = field.options?.choices || [];

  return (
    <div className={`fb-field fb-field-select ${field.advanced?.className || ''}`} style={{ width: `${width}%` }}>
      {field.label && (
        <label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="fb-required">*</span>}
        </label>
      )}
      <select
        id={field.id}
        name={field.name}
        value={value ?? field.defaultValue ?? ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={field.ui?.disabled}
      >
        <option value="">{field.placeholder || 'Select...'}</option>
        {choices.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {field.advanced?.helpText && <small className="fb-help">{field.advanced.helpText}</small>}
    </div>
  );
};

export default SelectField;

