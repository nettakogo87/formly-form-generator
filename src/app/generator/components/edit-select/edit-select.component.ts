import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { selectFieldModel } from '../../models/select-field.model';

@Component({
  selector: 'app-edit-select',
  templateUrl: './edit-select.component.html',
  styleUrls: ['./edit-select.component.scss'],
})
export class EditSelectComponent implements OnInit {

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public readonly saveField = new EventEmitter<FormlyFieldConfig>();

  public form = new FormGroup({});

  public fields = selectFieldModel;

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

  private _fromFormlyFieldConfig(field: FormlyFieldConfig): any {
    return {
      key: field.key,
      label: field.templateOptions && field.templateOptions.label,
      multiple: field.templateOptions && field.templateOptions.multiple,
      required: (field.templateOptions && field.templateOptions.required) || false,
      className: field.className || '',
      options: field.templateOptions && field.templateOptions.options,
    };
  }

  private _toFormlyFieldConfig(value: any): FormlyFieldConfig {
    return {
      key: value.key,
      type: 'select',
      className: value.className,
      templateOptions: {
        label: value.label,
        multiple: value.multiple,
        required: value.required,
        options: value.options,
      },
    };
  }

}
