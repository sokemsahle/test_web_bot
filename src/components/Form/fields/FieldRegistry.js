import TextField, {
  schema as textSchema,
  SettingsPanel as TextSettings,
  settingsSchema as textSettingsSchema,
} from './TextField';
import TextareaField, {
  schema as textareaSchema,
  SettingsPanel as TextareaSettings,
  settingsSchema as textareaSettingsSchema,
} from './TextareaField';
import NumberField, {
  schema as numberSchema,
  SettingsPanel as NumberSettings,
  settingsSchema as numberSettingsSchema,
} from './NumberField';
import EmailField, {
  schema as emailSchema,
  SettingsPanel as EmailSettings,
  settingsSchema as emailSettingsSchema,
} from './EmailField';

import SelectField, {
  schema as selectSchema,
  SettingsPanel as SelectSettings,
  settingsSchema as selectSettingsSchema,
} from './SelectField';
import RadioField, {
  schema as radioSchema,
  SettingsPanel as RadioSettings,
  settingsSchema as radioSettingsSchema,
} from './RadioField';
import CheckboxField, {
  schema as checkboxSchema,
  SettingsPanel as CheckboxSettings,
  settingsSchema as checkboxSettingsSchema,
} from './CheckboxField';
import DateField, {
  schema as dateSchema,
  SettingsPanel as DateSettings,
  settingsSchema as dateSettingsSchema,
} from './DateField';
import FileField, {
  schema as fileSchema,
  SettingsPanel as FileSettings,
  settingsSchema as fileSettingsSchema,
} from './FileField';

import HeadingField, {
  schema as headingSchema,
  SettingsPanel as HeadingSettings,
  settingsSchema as headingSettingsSchema,
} from './HeadingField';
import DividerField, {
  schema as dividerSchema,
  SettingsPanel as DividerSettings,
  settingsSchema as dividerSettingsSchema,
} from './DividerField';

export const FIELD_REGISTRY = {
  text: {
    type: 'text',
    schema: textSchema,
    Component: TextField,
    SettingsPanel: TextSettings,
    settingsSchema: textSettingsSchema,
  },
  textarea: {
    type: 'textarea',
    schema: textareaSchema,
    Component: TextareaField,
    SettingsPanel: TextareaSettings,
    settingsSchema: textareaSettingsSchema,
  },
  number: {
    type: 'number',
    schema: numberSchema,
    Component: NumberField,
    SettingsPanel: NumberSettings,
    settingsSchema: numberSettingsSchema,
  },
  email: {
    type: 'email',
    schema: emailSchema,
    Component: EmailField,
    SettingsPanel: EmailSettings,
    settingsSchema: emailSettingsSchema,
  },
 
  select: {
    type: 'select',
    schema: selectSchema,
    Component: SelectField,
    SettingsPanel: SelectSettings,
    settingsSchema: selectSettingsSchema,
  },
  dropdown: {
    type: 'dropdown',
    schema: {
      ...selectSchema,
      type: 'dropdown',
      label: 'Dropdown',
      name: 'dropdown_field',
    },
    Component: SelectField,
    SettingsPanel: SelectSettings,
    settingsSchema: selectSettingsSchema,
  },
  radio: {
    type: 'radio',
    schema: radioSchema,
    Component: RadioField,
    SettingsPanel: RadioSettings,
    settingsSchema: radioSettingsSchema,
  },
  checkbox: {
    type: 'checkbox',
    schema: checkboxSchema,
    Component: CheckboxField,
    SettingsPanel: CheckboxSettings,
    settingsSchema: checkboxSettingsSchema,
  },
  date: {
    type: 'date',
    schema: dateSchema,
    Component: DateField,
    SettingsPanel: DateSettings,
    settingsSchema: dateSettingsSchema,
  },
  file: {
    type: 'file',
    schema: fileSchema,
    Component: FileField,
    SettingsPanel: FileSettings,
    settingsSchema: fileSettingsSchema,
  },
  
  heading: {
    type: 'heading',
    schema: headingSchema,
    Component: HeadingField,
    SettingsPanel: HeadingSettings,
    settingsSchema: headingSettingsSchema,
  },
  divider: {
    type: 'divider',
    schema: dividerSchema,
    Component: DividerField,
    SettingsPanel: DividerSettings,
    settingsSchema: dividerSettingsSchema,
  },
};

