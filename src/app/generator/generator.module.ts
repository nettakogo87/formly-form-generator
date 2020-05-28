import { NgModule } from '@angular/core';

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './views/generator/generator.component';
import { SharedModule } from '../shared/shared.module';
import { PreviewComponent } from './containers/preview/preview.component';
import { CodePanComponent } from './containers/code-pan/code-pan.component';


@NgModule({
  declarations: [GeneratorComponent, PreviewComponent, CodePanComponent],
  imports: [
    GeneratorRoutingModule,
    SharedModule,
  ],
})
export class GeneratorModule { }
