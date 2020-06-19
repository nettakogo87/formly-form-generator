import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { selectFieldModel } from '../../models/select-field.model';
import { ExternalResourcesService } from '../../services/external-resources.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-select',
  templateUrl: './edit-select.component.html',
  styleUrls: ['./edit-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSelectComponent implements OnInit, OnDestroy {

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public readonly saveField = new EventEmitter<FormlyFieldConfig>();

  @Output()
  public readonly cancel = new EventEmitter<void>();

  public form = new FormGroup({});

  public fields = selectFieldModel.slice();

  public model = {};
  public options: FormlyFormOptions = {};

  private _destroyed$ = new Subject();

  constructor(private _externalResources: ExternalResourcesService) {
  }

  public ngOnInit(): void {
    if (this.field) {
      this.model = this._fromFormlyFieldConfig(this.field);
    }
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public submit(): void {
    if (this.form.valid) {
      if (this.form.value.external) {

        this._externalResources.getOptions(this.form.value.externalData.resource)
          .pipe(
            takeUntil(this._destroyed$),
          )
          .subscribe((options: any []) => {
            const formlyField = this._toFormlyFieldConfig(this.form.value, options);
            this.saveField.emit(formlyField);
          });

      } else {
        const formlyField = this._toFormlyFieldConfig(this.form.value, this.form.value.options);

        this.saveField.emit(formlyField);
      }
    }
  }

  public cancelForm(): void {
    this.cancel.emit();
  }

  private _fromFormlyFieldConfig(field: FormlyFieldConfig): any {
    const model: any = {
      key: field.key,
      required: (field.templateOptions && field.templateOptions.required) || false,
      className: field.className || '',
      external: false,
      externalData: {},
      options: [],
    };
    if (field.templateOptions) {
      if (field.templateOptions.label) {
        model.label = field.templateOptions.label;
      }
      if (field.templateOptions.multiple) {
        model.multiple = field.templateOptions.multiple;
      }
      if (field.templateOptions.options) {
        model.options = field.templateOptions.options;
        if (field.templateOptions.resource) {
          model.externalData.resource = field.templateOptions.resource;
          model.external = true;
        }
      }
      if (field.templateOptions.labelProp) {
        model.externalData.labelProp = field.templateOptions.labelProp;
        model.external = true;
      }
      if (field.templateOptions.labelProp) {
        model.externalData.valueProp = field.templateOptions.valueProp;
        model.external = true;
      }
    }

    return model;
  }

  private _toFormlyFieldConfig(value: any, options: any[]): FormlyFieldConfig {
    const formlyField: FormlyFieldConfig = {
      key: this.form.value.key,
      type: 'select',
      className: this.form.value.className,
      templateOptions: {
        label: this.form.value.label,
        multiple: this.form.value.multiple,
        required: this.form.value.required,
        options: options,
      },
    };

    if (this.form.value.externalData) {
      formlyField.templateOptions.resource = this.form.value.externalData.resource;
      formlyField.templateOptions.labelProp = this.form.value.externalData.labelProp;
      formlyField.templateOptions.valueProp = this.form.value.externalData.valueProp;
    }

    return formlyField;
  }
}
