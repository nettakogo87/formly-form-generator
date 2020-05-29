import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-edit-select',
  templateUrl: './edit-select.component.html',
  styleUrls: ['./edit-select.component.scss'],
})
export class EditSelectComponent implements OnInit {

  public form: FormGroup;

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public saveField = new EventEmitter<FormlyFieldConfig>();

  constructor(private _fb: FormBuilder) { }

  get options() {
    return this.form.get('options') as FormArray;
  }

  public ngOnInit(): void {
    this.form = this._fb.group({
      key: ['', Validators.required],
      label: ['', Validators.required],
      multiple: [false],
      required: [false],
      options: this._fb.array([
        this._fb.group({
          label: ['', Validators.required],
          value: ['', Validators.required],
        }),
      ]),
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

  public addOption(): void {
    this.options.push(this._fb.group({
      label: ['', Validators.required],
      value: ['', Validators.required],
    }));
  }

  private _fromFormlyFieldConfig(field: FormlyFieldConfig): any {
    const options = field.templateOptions.options as any[];
    for (let i = 1; i < options.length; i++) {
      this.addOption();
    }

    return {
      key: field.key,
      label: field.templateOptions && field.templateOptions.label,
      multiple: field.templateOptions && field.templateOptions.multiple,
      required: (field.templateOptions && field.templateOptions.required) || false,
      options: field.templateOptions && field.templateOptions.options,
      className: field.className || '',
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
