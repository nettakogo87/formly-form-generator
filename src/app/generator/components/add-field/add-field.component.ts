import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFieldComponent implements OnInit {

  public isEditPanelOpen = false;

  @Output()
  public addField = new EventEmitter();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public add(field: FormlyFieldConfig): void {
    this.addField.emit(field);
    this.isEditPanelOpen = false;
  }
}
