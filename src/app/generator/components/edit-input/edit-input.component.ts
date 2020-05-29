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
      required: field.templateOptions && field.templateOptions.required,
    };
  }

  private _toFormlyFieldConfig(value: any): FormlyFieldConfig {
    return {
      key: value.key,
      type: 'input',
      templateOptions: {
        label: value.label,
        required: value.required,
      },
    };
  }
}
