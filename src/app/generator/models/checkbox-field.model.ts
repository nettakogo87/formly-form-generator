import { FormlyFieldConfig } from '@ngx-formly/core';

export const checkboxFieldModel: FormlyFieldConfig[] = [
  {
    key: 'key',
    type: 'input',
    templateOptions: {
      label: 'Key',
      required: true,
    },
    wrappers: ['generator-field', 'form-field'],
  },
  {
    key: 'label',
    type: 'input',
    templateOptions: {
      label: 'Label',
      required: true,
    },
    wrappers: ['generator-field', 'form-field'],
  },
  {
    key: 'className',
    type: 'input',
    templateOptions: {
      label: 'Custom class',
    },
    wrappers: ['generator-field', 'form-field'],
  },
];
