import React from 'react';
import './DynamicField.css';

const DynamicField = ({ config, value, onChange, error }) => {
  const {
    id,
    label,
    required,
    placeholder,
    type,
    options,
    min,
    max,
    step,
    rows,
    readonly,
  } = config;

  const commonProps = {
    id,
    value: value ?? config.default_value ?? '',
    onChange: (e) =>
      onChange(id, e.target.type === 'checkbox' ? e.target.checked : e.target.value),
    readOnly: readonly,
    className: `df-input ${error ? 'df-input-error' : ''}`,
  };

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={rows || 3}
            placeholder={placeholder}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            {...commonProps}
            min={min}
            max={max}
            step={step}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            {...commonProps}
            placeholder={placeholder}
          />
        );

      case 'phone':
        return (
          <input
            type="tel"
            {...commonProps}
            placeholder={placeholder}
          />
        );

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div
            className={`df-choice-group ${
              config.inline ? 'df-choice-inline' : 'df-choice-block'
            }`}
          >
            {options?.map((opt) => (
              <label key={opt.value}>
                <input
                  type="radio"
                  name={id}
                  checked={value === opt.value}
                  onChange={() => onChange(id, opt.value)}
                />{' '}
                {opt.label}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="df-choice-group df-choice-block">
            {options?.map((opt) => (
              <label key={opt.value}>
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(opt.value)}
                  onChange={(e) => {
                    const newValue = Array.isArray(value) ? [...value] : [];
                    if (e.target.checked) newValue.push(opt.value);
                    else {
                      onChange(
                        id,
                        newValue.filter((v) => v !== opt.value)
                      );
                      return;
                    }
                    onChange(id, newValue);
                  }}
                />{' '}
                {opt.label}
              </label>
            ))}
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            {...commonProps}
            min={config.min_date}
            max={config.max_date}
          />
        );

      case 'time':
        return (
          <input
            type="time"
            {...commonProps}
            min={config.min_time}
            max={config.max_time}
          />
        );

      case 'datetime':
        return <input type="datetime-local" {...commonProps} />;

      case 'file':
      case 'image':
        return (
          <div className="df-choice-group">
            <input
              type="file"
              accept={config.allowed_types?.join(',')}
              onChange={(e) => onChange(id, e.target.files)}
            />
            {type === 'image' && value && (
              <div className="df-image-preview">
                <img
                  src={URL.createObjectURL(value[0])}
                  alt="Preview"
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            {...commonProps}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="df-field">
      {label && (
        <label className="df-label" htmlFor={id}>
          {label}
          {required && <span className="df-required">*</span>}
        </label>
      )}
      {renderField()}
      {error && <small className="df-error">{error}</small>}
    </div>
  );
};

export default DynamicField;