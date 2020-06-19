import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { chipsFieldModel } from '../../models/chips-field.model';

@Component({
  selector: 'app-edit-chips',
  templateUrl: './edit-chips.component.html',
  styleUrls: ['./edit-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditChipsComponent implements OnInit {

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public readonly saveField = new EventEmitter<FormlyFieldConfig>();

  @Output()
  public readonly cancel = new EventEmitter<void>();

  public form = new FormGroup({});

  public fields = chipsFieldModel.slice();

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
    const form: any = {
      key: field.key,
      label: field.templateOptions && field.templateOptions.label,
      resource: field.templateOptions.resource,
    };
    if (field.templateOptions && field.templateOptions.labelProp) {
      form.labelProp = field.templateOptions.labelProp;
    }
    if (field.templateOptions && field.templateOptions.valueProp) {
      form.valueProp = field.templateOptions.valueProp;
    }
    return form;
  }

  private _toFormlyFieldConfig(value: any): FormlyFieldConfig {
    const field: FormlyFieldConfig = {
      key: value.key,
      type: 'chips-autocomplete',
      templateOptions: {
        label: value.label,
        resource: value.resource,
        removable: true,
      },
    };
    if (this.form.value.labelProp) {
      field.templateOptions.labelProp = this.form.value.labelProp;
    }
    if (this.form.value.valueProp) {
      field.templateOptions.valueProp = this.form.value.valueProp;
    }
    return field;
  }

}
