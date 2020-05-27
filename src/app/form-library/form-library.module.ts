import { NgModule } from '@angular/core';

import { FormLibraryComponent } from './views/form-library/form-library.component';
import { FormLibraryRoutingModule } from './form-library-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [FormLibraryComponent],
  imports: [
    FormLibraryRoutingModule,
    SharedModule,
  ],
})
export class FormLibraryModule { }
