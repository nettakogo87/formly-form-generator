import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFieldComponent {

  public isOpened = false;

  @Output()
  public readonly addField = new EventEmitter();

  constructor() {
  }

  public add(field: FormlyFieldConfig): void {
    this.addField.emit(field);
    this.isOpened = false;
  }
}
