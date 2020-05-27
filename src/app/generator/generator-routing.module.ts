import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratorComponent } from './views/generator/generator.component';


const routes: Routes = [
  {
    path: 'new',
    component: GeneratorComponent,
  },
  {
    path: '',
    redirectTo: 'new',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorRoutingModule { }
