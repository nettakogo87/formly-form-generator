import { NgModule } from '@angular/core';

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './views/generator/generator.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    GeneratorRoutingModule,
    SharedModule,
  ],
})
export class GeneratorModule { }
