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
  type: 'file',
  label: 'File Upload',
  name: 'file_field',
  required: false,
  defaultValue: null,
  validation: { maxSizeMb: null },
  options: { allowedTypes: [] },
  ui: { width: 100, hidden: false, disabled: false },
  logic: { visibleWhen: null },
  advanced: { className: '', helpText: '' },
};

export const settingsSchema = [
  ...BASIC_SETTINGS,
  {
    key: 'allowedTypes',
    path: 'options.allowedTypes',
    type: 'text',
    label: 'Allowed types (comma-separated, e.g. image/png,application/pdf)',
    category: 'Data',
  },
  { key: 'maxSizeMb', path: 'validation.maxSizeMb', type: 'number', label: 'Max size (MB)', category: 'Validation' },
  ...DATA_SETTINGS,
  ...UI_SETTINGS,
  ...LOGIC_SETTINGS,
  ...ADVANCED_SETTINGS,
];

export const SettingsPanel = ({ field, onChange }) => {
  const normalized = {
    ...field,
    options: {
      ...field.options,
      allowedTypes: field.options?.allowedTypes || [],
    },
  };

  const handleChange = (updatedField) => {
    const cfg = { ...updatedField };
    const raw = cfg.options?.allowedTypes;
    if (typeof raw === 'string') {
      cfg.options.allowedTypes = raw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }
    onChange(cfg);
  };

  const fieldForForm = {
    ...normalized,
    options: {
      ...normalized.options,
      allowedTypes: normalized.options.allowedTypes.join(', '),
    },
  };

  return (
    <SettingsForm schema={settingsSchema} field={fieldForForm} onFieldChange={handleChange} />
  );
};

const FileField = ({ field, value, onChange }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;
  const accept = (field.options?.allowedTypes || []).join(',');

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onChange(null);
      return;
    }
    onChange(files);
  };

  return (
    <div className={`fb-field fb-field-file ${field.advanced?.className || ''}`} style={{ width: `${width}%` }}>
      {field.label && (
        <label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="fb-required">*</span>}
        </label>
      )}
      <input
        id={field.id}
        name={field.name}
        type="file"
        accept={accept || undefined}
        onChange={handleChange}
        disabled={field.ui?.disabled}
      />
      {field.advanced?.helpText && <small className="fb-help">{field.advanced.helpText}</small>}
    </div>
  );
};

export default FileField;

