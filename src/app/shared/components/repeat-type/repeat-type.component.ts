import { Component } from '@angular/core';

import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  templateUrl: './repeat-type.component.html',
  styleUrls: ['./repeat-type.component.scss'],
})
export class RepeatTypeComponent extends FieldArrayType {
  constructor() {
    super();
  }
}
