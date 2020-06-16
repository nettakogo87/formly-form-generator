import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { inputFieldModel } from '../../models/input-field.model';


@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInputComponent implements OnInit {

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public readonly saveField = new EventEmitter<FormlyFieldConfig>();

  public form = new FormGroup({});

  public fields = inputFieldModel;

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
    const form: any = {
      key: field.key,
      label: field.templateOptions && field.templateOptions.label,
      required: (field.templateOptions && field.templateOptions.required) || false,
      className: field.className || '',
    };
    // const expressionKeys = Object.keys(field.expressionProperties);
    // if (expressionKeys.length > 0) {
    //   form.expressionOption = expressionKeys[0] || '';
    //   form.expressionValue = field.expressionProperties[form.expressionOption] || '';
    // }
    return form;
  }

  private _toFormlyFieldConfig(value: any): FormlyFieldConfig {
    const field: FormlyFieldConfig = {
      key: value.key,
      type: 'input',
      className: value.className,
      templateOptions: {
        label: value.label,
        required: value.required,
      },
    };
    // const expressionProperties: any = {};
    // expressionProperties[value.expressionOption] = value.expressionValue;
    // field.expressionProperties = expressionProperties;
    return field;
  }
}
