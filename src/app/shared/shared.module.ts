import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { MaterialModule } from './material.module';
import { AngularSplitModule } from 'angular-split';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,

    // Formly
    FormlyModule.forChild({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyMaterialModule,

    // Material
    MaterialModule,

    // Other
    AngularSplitModule.forChild(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,

    // Formly
    FormlyModule,
    FormlyMaterialModule,

    // Material
    MaterialModule,

    // Other
    AngularSplitModule,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
