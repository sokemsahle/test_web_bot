import React from 'react';
import './FieldStyles.css';
import {
  UI_SETTINGS,
  LOGIC_SETTINGS,
  ADVANCED_SETTINGS,
} from './fieldTypes';
import SettingsForm from './SettingsForm';

export const schema = {
  id: '',
  type: 'divider',
  label: 'Divider',
  name: 'divider_field',
  required: false,
  defaultValue: '',
  validation: {},
  options: {},
  ui: { width: 100, hidden: false, disabled: false },
  logic: { visibleWhen: null },
  advanced: { className: '' },
};

export const settingsSchema = [
  ...UI_SETTINGS,
  ...LOGIC_SETTINGS,
  ...ADVANCED_SETTINGS,
];

export const SettingsPanel = ({ field, onChange }) => (
  <SettingsForm schema={settingsSchema} field={field} onFieldChange={onChange} />
);

const DividerField = ({ field }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;

  return (
    <div className={`fb-field fb-field-divider ${field.advanced?.className || ''}`} style={{ width: `${width}%` }}>
      <hr />
    </div>
  );
};

export default DividerField;

