import { FormlyFieldConfig } from '@ngx-formly/core';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInputComponent implements OnInit {

  public form: FormGroup;

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public saveField = new EventEmitter<FormlyFieldConfig>();

  constructor(private _fb: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this._fb.group({
      key: ['', Validators.required],
      label: ['', Validators.required],
      required: [false],
      className: [''],
      expressionOption: [''],
      expressionValue: [''],
    });
    if (this.field) {
      this.form.setValue(this._fromFormlyFieldConfig(this.field));
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
    const expressionKeys = Object.keys(field.expressionProperties);
    if (expressionKeys.length > 0) {
      form.expressionOption = expressionKeys[0] || '';
      form.expressionValue = field.expressionProperties[form.expressionOption] || '';
    }
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
    const expressionProperties: any = {};
    expressionProperties[value.expressionOption] = value.expressionValue;
    field.expressionProperties = expressionProperties;
    return field;
  }
}
