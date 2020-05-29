import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-edit-checkbox',
  templateUrl: './edit-checkbox.component.html',
  styleUrls: ['./edit-checkbox.component.scss'],
})
export class EditCheckboxComponent implements OnInit {

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
      className: [''],
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
