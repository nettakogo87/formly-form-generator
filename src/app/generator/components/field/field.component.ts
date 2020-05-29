import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit {

  @Input()
  public field;

  @Output()
  public removeField = new EventEmitter<FormlyFieldConfig>();

  constructor() { }

  public ngOnInit(): void {

  }

  public remove(item: FormlyFieldConfig): void {
    this.removeField.emit(item);
  }
}
