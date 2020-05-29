import { NgModule } from '@angular/core';

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './views/generator/generator.component';
import { SharedModule } from '../shared/shared.module';
import { PreviewComponent } from './containers/preview/preview.component';
import { CodePanComponent } from './containers/code-pan/code-pan.component';
import { EditInputComponent } from './components/edit-input/edit-input.component';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { FieldComponent } from './components/field/field.component';
import { EditInputDialogComponent } from './containers/edit-input-dialog/edit-input-dialog.component';
import { EditSelectComponent } from './components/edit-select/edit-select.component';
import { EditSelectDialogComponent } from './containers/edit-select-dialog/edit-select-dialog.component';
import { EditCheckboxComponent } from './components/edit-checkbox/edit-checkbox.component';
import { EditCheckboxDialogComponent } from './containers/edit-checkbox-dialog/edit-checkbox-dialog.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { EditGroupDialogComponent } from './containers/edit-group-dialog/edit-group-dialog.component';


@NgModule({
  declarations: [
    GeneratorComponent,
    PreviewComponent,
    CodePanComponent,
    AddFieldComponent,
    FieldComponent,
    EditInputComponent,
    EditInputDialogComponent,
    EditSelectComponent,
    EditSelectDialogComponent,
    EditCheckboxComponent,
    EditCheckboxDialogComponent,
    EditGroupComponent,
    EditGroupDialogComponent,
  ],
  imports: [
    GeneratorRoutingModule,
    SharedModule,
  ],
})
export class GeneratorModule { }
