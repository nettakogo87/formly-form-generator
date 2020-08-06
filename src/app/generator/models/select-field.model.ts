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
    key: 'external',
    type: 'toggle',
    templateOptions: {
      label: 'External resource enabled',
      description: 'Get options from external resource',
    },
    wrappers: ['generator-field', 'form-field'],
  },
  {
    key: 'externalData',
    templateOptions: {
      label: 'External params',
    },
    hideExpression: ((model: any, formState: any, field?: FormlyFieldConfig) => {
      return !field.parent.model.external;
    }),
    wrappers: ['panel'],
    fieldGroup: [
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
      },
    ],
  },
  {
    key: 'options',
    type: 'mega-repeat',
    templateOptions: {
      label: 'Options',
      addText: 'add',
      removeText: 'remove',
    },
    wrappers: ['panel'],
    hideExpression: ((model: any, formState: any, field?: FormlyFieldConfig) => {
      return field.parent.model.external;
    }),
    fieldArray: {
      key: 'option',
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
