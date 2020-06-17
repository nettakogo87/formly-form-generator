import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-view-field-data',
  templateUrl: './view-field-data.component.html',
  styleUrls: ['./view-field-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewFieldDataComponent {

  @Input()
  public field: FormlyFieldConfig;

  constructor() { }
}
