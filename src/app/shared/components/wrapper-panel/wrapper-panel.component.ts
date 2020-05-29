import { Component } from '@angular/core';

import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-wrapper-panel',
  templateUrl: './wrapper-panel.component.html',
  styleUrls: ['./wrapper-panel.component.scss'],
})
export class WrapperPanelComponent extends FieldWrapper {

  constructor() {
    super();
  }
}
