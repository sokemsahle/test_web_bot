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
  type: 'text',
  label: 'Text',
  name: 'text_field',
  required: false,
  placeholder: '',
  defaultValue: '',
  validation: {
    minLength: 0,
    maxLength: 255,
    pattern: '',
  },
  options: {},
  ui: {
    width: 100,
    hidden: false,
    disabled: false,
  },
  logic: {
    visibleWhen: null,
  },
  advanced: {
    className: '',
    helpText: '',
  },
};

export const settingsSchema = [
  ...BASIC_SETTINGS,
  { key: 'minLength', path: 'validation.minLength', type: 'number', label: 'Min length', category: 'Validation' },
  { key: 'maxLength', path: 'validation.maxLength', type: 'number', label: 'Max length', category: 'Validation' },
  ...DATA_SETTINGS,
  ...UI_SETTINGS,
  ...LOGIC_SETTINGS,
  ...ADVANCED_SETTINGS,
];

export const SettingsPanel = ({ field, onChange }) => (
  <SettingsForm schema={settingsSchema} field={field} onFieldChange={onChange} />
);

const TextField = ({ field, value, onChange }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;

  return (
    <div
      className={`fb-field fb-field-text ${field.advanced?.className || ''}`}
      style={{ width: `${width}%` }}
    >
      {field.label && (
        <label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="fb-required">*</span>}
        </label>
      )}
      <input
        id={field.id}
        name={field.name}
        type="text"
        placeholder={field.placeholder}
        value={value ?? field.defaultValue ?? ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={field.ui?.disabled}
      />
      {field.advanced?.helpText && (
        <small className="fb-help">{field.advanced.helpText}</small>
      )}
    </div>
  );
};

export default TextField;

