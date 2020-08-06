import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-wrapper-test-field',
  templateUrl: './wrapper-test-field.component.html',
  styleUrls: ['./wrapper-test-field.component.scss'],
})
export class WrapperTestFieldComponent extends FieldWrapper {
  constructor() {
    super();
  }
}
