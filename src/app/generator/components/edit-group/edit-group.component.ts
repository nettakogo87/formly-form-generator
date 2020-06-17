import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { groupFieldModel } from '../../models/group-field.model';


@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGroupComponent implements OnInit {

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public readonly saveField = new EventEmitter<FormlyFieldConfig>();

  @Output()
  public readonly cancel = new EventEmitter<void>();

  public form = new FormGroup({});

  public fields = groupFieldModel.slice();

  public model = {};
  public options: FormlyFormOptions = {};

  constructor() {
  }

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
      wrappers: field.wrappers.map(x => {
        return { 'wrapper': x };
      }),
    };
  }

  private _toFormlyFieldConfig(value: any): FormlyFieldConfig {
    return {
      key: value.key,
      className: value.className,
      wrappers: value.wrappers.map(x => x.wrapper),
      fieldGroup: [{}],
      templateOptions: {
        label: value.label,
      },
    };
  }
}
