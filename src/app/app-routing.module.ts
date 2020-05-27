import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'generator',
        loadChildren: () =>
          import('./generator/generator.module').then(m => m.GeneratorModule),
      },
      {
        path: 'form-library',
        loadChildren: () =>
          import('./form-library/form-library.module').then(m => m.FormLibraryModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
