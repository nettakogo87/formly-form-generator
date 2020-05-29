import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit {

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
      wrappers: this._fb.array([
        this._fb.control(''),
      ]),
    });
    if (this.field) {
      this.form.setValue(this._fromFormlyFieldConfig(this.field));
    }
  }

  public get wrappers() {
    return this.form.get('wrappers') as FormArray;
  }

  public submit(): void {
    if (this.form.valid) {
      const field = this._toFormlyFieldConfig(this.form.value);
      this.saveField.emit(field);
    }
  }

  public addWrapper(): void {
    this.wrappers.push(this._fb.control(''));
  }

  private _fromFormlyFieldConfig(field: FormlyFieldConfig): any {
    const wrappers = field.wrappers as any[];
    for (let i = 1; i < wrappers.length; i++) {
      this.addWrapper();
    }

    return {
      key: field.key,
      label: field.templateOptions && field.templateOptions.label,
      className: field.className || '',
      wrappers: field.wrappers,
    };
  }

  private _toFormlyFieldConfig(value: any): FormlyFieldConfig {
    return {
      key: value.key,
      className: value.className,
      wrappers: value.wrappers,
      fieldGroup: [{}],
      templateOptions: {
        label: value.label,
      },
    };
  }
}
