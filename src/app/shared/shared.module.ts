import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

import { MaterialModule } from './material.module';
import { AngularSplitModule } from 'angular-split';

import { WrapperPanelComponent } from './components/wrapper-panel/wrapper-panel.component';
import { WrapperGeneratorFieldComponent } from './components/wrapper-generator-field/wrapper-generator-field.component';
import { WrapperTestFieldComponent } from './components/wrapper-test-field/wrapper-test-field.component';
import { RepeatTypeComponent } from './components/repeat-type/repeat-type.component';
import { FormlyChipsAutocompleteComponent } from './components/formly-chips-autocomplete/formly-chips-autocomplete.component';


@NgModule({
  declarations: [
    WrapperPanelComponent,
    WrapperGeneratorFieldComponent,
    WrapperTestFieldComponent,
    RepeatTypeComponent,
    FormlyChipsAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
        { name: 'generator-field', component: WrapperGeneratorFieldComponent, types: ['input'] },
        { name: 'test-field', component: WrapperTestFieldComponent, types: ['mega-repeat'] },
      ],
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
        {
          name: 'mega-repeat', extends: 'repeat', defaultOptions: {
            name: 'MegaRepeat',
            templateOptions: {
              type: 'mega-repeat',
              label: 'MegaRepeat',
            },
          },
        },
        { name: 'chips-autocomplete', component: FormlyChipsAutocompleteComponent, wrappers: ['form-field'] },
      ],
      extras: {
        immutable: true,
      },
    }),
    FormlyMaterialModule,
    FormlyMatToggleModule,

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
