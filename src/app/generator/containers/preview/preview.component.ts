import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FieldsService } from '../../services/fields.service';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit, OnDestroy {

  public form = new FormGroup({});
  public model: any = {};

  public fields: FormlyFieldConfig[] = [];
  public options: FormlyFormOptions = {};

  private _formData: any

  private _destroyed$ = new Subject();

  constructor(
    private _fieldService: FieldsService,
    private _formDataService: FormDataService,
    private readonly _cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this._formDataService.data$
      .pipe(
        takeUntil(this._destroyed$),
      )
      .subscribe((formData: any) => {
        this._formData = formData;
      });

    this._fieldService.fields$
      .pipe(
        takeUntil(this._destroyed$),
      )
      .subscribe((fields: FormlyFieldConfig[]) => {
        this.clearFormData();
        this.fields = fields;
        if (this.options.resetModel) {
          this.options.resetModel();
        }
        this._cdr.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public submit(): void {
    if (this.form.valid) {
      this._formDataService.setFormData(this.form.value);
    }
  }

  public fillForm(): void {
    this.model = this._formData;
    this._cdr.detectChanges();
  }

  public clear(): void {
    this.fields = [];
    this._cdr.detectChanges();
  }

  public clearFormData(): void {
    this.form = new FormGroup({});
    this.model = {};
  }
}
