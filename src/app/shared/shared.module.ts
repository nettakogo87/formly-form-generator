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

import { WrapperPanelComponent } from './components/wrapper-panel/wrapper-panel.component';
import { WrapperGeneratorFieldComponent } from './components/wrapper-generator-field/wrapper-generator-field.component';


@NgModule({
  declarations: [WrapperPanelComponent, WrapperGeneratorFieldComponent],
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
      wrappers: [
        { name: 'panel', component: WrapperPanelComponent },
        { name: 'generator-field', component: WrapperGeneratorFieldComponent },
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
