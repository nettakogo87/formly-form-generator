import { Component } from '@angular/core';

import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-wrapper-generator-field',
  templateUrl: './wrapper-generator-field.component.html',
  styleUrls: ['./wrapper-generator-field.component.scss'],
})
export class WrapperGeneratorFieldComponent extends FieldWrapper {
  constructor() {
    super();
  }
}
