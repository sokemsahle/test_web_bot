// Function to dynamically create a form based on the provided layout and fields
export const createForm = (layout, fields) => {
  const form = document.createElement('form');

  layout.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'form-row';

    row.forEach((fieldId) => {
      const fieldData = fields.find((field) => field.id === fieldId);
      if (fieldData) {
        const fieldElement = createField(fieldData);
        rowDiv.appendChild(fieldElement);
      }
    });

    form.appendChild(rowDiv);
  });

  return form;
};

// Helper function to create individual form fields
const createField = (field) => {
  let element;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
    case 'date':
    case 'time':
      element = document.createElement('input');
      element.type = field.type;
      break;
    case 'textarea':
      element = document.createElement('textarea');
      break;
    case 'checkbox':
    case 'radio':
      element = document.createElement('input');
      element.type = field.type;
      const label = document.createElement('label');
      label.textContent = field.label;
      label.appendChild(element);
      return label;
    case 'select':
      element = document.createElement('select');
      const option = document.createElement('option');
      option.textContent = field.label;
      element.appendChild(option);
      break;
    case 'file':
      element = document.createElement('input');
      element.type = 'file';
      break;
    default:
      element = document.createElement('input');
      element.type = 'text';
  }

  element.name = field.name;
  element.placeholder = field.label;
  element.className = 'form-field';

  return element;
};