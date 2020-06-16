import { FormlyFieldConfig } from '@ngx-formly/core';

export const selectFieldModel: FormlyFieldConfig[] = [
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
    key: 'required',
    type: 'checkbox',
    templateOptions: {
      label: 'Required',
    },
    wrappers: ['generator-field', 'form-field'],
  },
  {
    key: 'multiple',
    type: 'checkbox',
    templateOptions: {
      label: 'Multiple',
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
  {
    key: 'options',
    type: 'repeat',
    templateOptions: {
      label: 'Options',
      addText: 'add',
      removeText: 'remove',
    },
    wrappers: ['panel'],
    fieldArray: {
      fieldGroup: [
        {
          key: 'label',
          type: 'input',
          templateOptions: {
            label: 'Label',
          },
        },
        {
          key: 'value',
          type: 'input',
          templateOptions: {
            label: 'Value',
          },
        },
      ],
    },
  },
];
