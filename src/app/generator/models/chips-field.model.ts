import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ExternalResourcesService } from '../services/external-resources.service';

export function getChipsFieldModel(externalResourcesService: ExternalResourcesService): FormlyFieldConfig[] {
  return [
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
      asyncValidators: {
        availableResource: {
          expression: (control: FormControl) => {
            return externalResourcesService.getOptions(control.value)
              .pipe(
                catchError((error: any) => {
                  if (error.status === 404) {
                    return of(false);
                  }
                  return error;
                }),
              ).toPromise();
          },
          message: 'This resource is unavailable!',
        },
      },
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
}
