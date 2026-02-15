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
  type: 'date',
  label: 'Date',
  name: 'date_field',
  required: false,
  defaultValue: '',
  validation: { min: '', max: '' },
  options: {},
  ui: { width: 100, hidden: false, disabled: false },
  logic: { visibleWhen: null },
  advanced: { className: '', helpText: '' },
};

export const settingsSchema = [
  ...BASIC_SETTINGS,
  { key: 'min', path: 'validation.min', type: 'text', label: 'Min date (YYYY-MM-DD)', category: 'Validation' },
  { key: 'max', path: 'validation.max', type: 'text', label: 'Max date (YYYY-MM-DD)', category: 'Validation' },
  ...DATA_SETTINGS,
  ...UI_SETTINGS,
  ...LOGIC_SETTINGS,
  ...ADVANCED_SETTINGS,
];

export const SettingsPanel = ({ field, onChange }) => (
  <SettingsForm schema={settingsSchema} field={field} onFieldChange={onChange} />
);

const DateField = ({ field, value, onChange }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;
  return (
    <div className={`fb-field fb-field-date ${field.advanced?.className || ''}`} style={{ width: `${width}%` }}>
      {field.label && (
        <label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="fb-required">*</span>}
        </label>
      )}
      <input
        id={field.id}
        name={field.name}
        type="date"
        value={value ?? field.defaultValue ?? ''}
        onChange={(e) => onChange(e.target.value)}
        min={field.validation?.min || undefined}
        max={field.validation?.max || undefined}
        disabled={field.ui?.disabled}
      />
      {field.advanced?.helpText && <small className="fb-help">{field.advanced.helpText}</small>}
    </div>
  );
};

export default DateField;

