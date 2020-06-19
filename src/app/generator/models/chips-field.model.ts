import { FormlyFieldConfig } from '@ngx-formly/core';

export const chipsFieldModel: FormlyFieldConfig[] = [
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
    key: 'resource',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Resource url',
    },
    wrappers: ['generator-field', 'form-field'],
  },
  {
    key: 'labelProp',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Label Property Name',
    },
    wrappers: ['generator-field', 'form-field'],
  },
  {
    key: 'valueProp',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Value Property Name',
    },
    wrappers: ['generator-field', 'form-field'],
  }
];
