import React from 'react';
import './FieldStyles.css';
import {
  BASIC_SETTINGS,
  UI_SETTINGS,
  LOGIC_SETTINGS,
  ADVANCED_SETTINGS,
} from './fieldTypes';
import SettingsForm from './SettingsForm';

export const schema = {
  id: '',
  type: 'heading',
  label: 'Heading',
  name: 'heading_field',
  required: false,
  defaultValue: '',
  validation: {},
  options: { level: 3 },
  ui: { width: 100, hidden: false, disabled: false },
  logic: { visibleWhen: null },
  advanced: { className: '', helpText: '' },
};

export const settingsSchema = [
  ...BASIC_SETTINGS,
  {
    key: 'level',
    path: 'options.level',
    type: 'number',
    label: 'Heading level (1-6)',
    category: 'UI',
  },
  ...UI_SETTINGS,
  ...LOGIC_SETTINGS,
  ...ADVANCED_SETTINGS,
];

export const SettingsPanel = ({ field, onChange }) => (
  <SettingsForm schema={settingsSchema} field={field} onFieldChange={onChange} />
);

const HeadingField = ({ field }) => {
  if (field.ui?.hidden) return null;
  const width = field.ui?.width ?? 100;
  const level = Math.min(6, Math.max(1, field.options?.level || 3));
  const Tag = `h${level}`;

  return (
    <div className={`fb-field fb-field-heading ${field.advanced?.className || ''}`} style={{ width: `${width}%` }}>
      <Tag>{field.label}</Tag>
      {field.advanced?.helpText && <small className="fb-help">{field.advanced.helpText}</small>}
    </div>
  );
};

export default HeadingField;

