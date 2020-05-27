import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormLibraryComponent } from './views/form-library/form-library.component';


const routes: Routes = [
  {
    path: '',
    component: FormLibraryComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormLibraryRoutingModule { }
