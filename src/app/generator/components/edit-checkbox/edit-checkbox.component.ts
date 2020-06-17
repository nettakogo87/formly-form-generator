import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { checkboxFieldModel } from '../../models/checkbox-field.model';

@Component({
  selector: 'app-edit-checkbox',
  templateUrl: './edit-checkbox.component.html',
  styleUrls: ['./edit-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCheckboxComponent implements OnInit {
  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public readonly saveField = new EventEmitter<FormlyFieldConfig>();

  @Output()
  public readonly cancel = new EventEmitter<void>();

  public form = new FormGroup({});

  public fields = checkboxFieldModel.slice();

  public model = {};
  public options: FormlyFormOptions = {};

  constructor() { }

  public ngOnInit(): void {
    if (this.field) {
      this.model = this._fromFormlyFieldConfig(this.field);
    }
  }

  public submit(): void {
    if (this.form.valid) {
      const field = this._toFormlyFieldConfig(this.form.value);
      this.saveField.emit(field);
    }
  }

  public cancelForm(): void {
    this.cancel.emit();
  }

  private _fromFormlyFieldConfig(field: FormlyFieldConfig): any {
    return {
      key: field.key,
      label: field.templateOptions && field.templateOptions.label,
      className: field.className || '',
    };
  }

  private _toFormlyFieldConfig(value: any): FormlyFieldConfig {
    return {
      key: value.key,
      type: 'checkbox',
      className: value.className,
      templateOptions: {
        label: value.label,
      },
    };
  }

}
