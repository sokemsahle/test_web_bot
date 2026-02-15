import React from 'react';
import { fieldHelpers } from './fieldTypes';

const { getByPath, setByPath } = fieldHelpers;

const renderSettingInput = (setting, value, onChange) => {
  const common = {
    id: setting.key,
    name: setting.key,
    value: value ?? '',
    onChange: (e) => onChange(e.target.value),
  };

  switch (setting.type) {
    case 'boolean':
      return (
        <input
          type="checkbox"
          id={setting.key}
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    case 'number':
      return (
        <input
          type="number"
          {...common}
          value={value ?? ''}
        />
      );
    case 'textarea':
      return (
        <textarea
          {...common}
          rows={3}
        />
      );
    case 'select':
      return (
        <select
          id={setting.key}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select...</option>
          {(setting.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    default:
      return <input type="text" {...common} />;
  }
};

export const SettingsForm = ({ schema, field, onFieldChange }) => {
  const byCategory = schema.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const handleSettingChange = (setting, rawValue) => {
    const nextField = setting.path
      ? setByPath(field, setting.path, rawValue)
      : { ...field, [setting.key]: rawValue };

    onFieldChange(nextField);
  };

  return (
    <div className="settings-panel">
      {Object.entries(byCategory).map(([category, settings]) => (
        <div key={category} className="settings-section">
          <h4>{category}</h4>
          {settings.map((setting) => {
            const value = setting.path
              ? getByPath(field, setting.path)
              : field[setting.key];
            return (
              <div key={setting.key} className="settings-row">
                <label htmlFor={setting.key}>{setting.label}</label>
                {renderSettingInput(setting, value, (v) =>
                  handleSettingChange(setting, v)
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SettingsForm;

