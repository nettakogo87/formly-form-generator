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


@NgModule({
  declarations: [
    GeneratorComponent,
    PreviewComponent,
    CodePanComponent,
    AddFieldComponent,
    FieldComponent,
    EditInputComponent,
    EditInputDialogComponent,
  ],
  imports: [
    GeneratorRoutingModule,
    SharedModule,
  ],
})
export class GeneratorModule { }
