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
  type: 'number',
  label: 'Number',
  name: 'number_field',
  required: false,
  placeholder: '',
  defaultValue: '',
  validation: { min: null, max: null, step: 1 },
  options: {},
  ui: { width: 100, hidden: false, disabled: false },
  logic: { visibleWhen: null },
  advanced: { className: '', helpText: '' },
};

export const settingsSchema = [
  ...BASIC_SETTINGS,
  { key: 'min', path: 'validation.min', type: 'number', label: 'Min', category: 'Validation' },
  { key: 'max', path: 'validation.max', type: 'number', label: 'Max', category: 'Validation' },
  { key: 'step', path: 'validation.step', type: 'number', label: 'Step', category: 'Validation' },
  ...DATA_SETTINGS,
  ...UI_SETTINGS,
  ...LOGIC_SETTINGS,
  ...ADVANCED_SETTINGS,
];

export const SettingsPanel = ({ field, onChange }) => (
  <SettingsForm schema={settingsSchema} field={field} onFieldChange={onChange} />
);

const NumberField = ({ field, value, onChange }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;
  return (
    <div className={`fb-field fb-field-number ${field.advanced?.className || ''}`} style={{ width: `${width}%` }}>
      {field.label && (
        <label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="fb-required">*</span>}
        </label>
      )}
      <input
        id={field.id}
        name={field.name}
        type="number"
        placeholder={field.placeholder}
        value={value ?? field.defaultValue ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        min={field.validation?.min ?? undefined}
        max={field.validation?.max ?? undefined}
        step={field.validation?.step ?? undefined}
        disabled={field.ui?.disabled}
      />
      {field.advanced?.helpText && <small className="fb-help">{field.advanced.helpText}</small>}
    </div>
  );
};

export default NumberField;

