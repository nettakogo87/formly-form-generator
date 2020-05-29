import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FieldsService } from '../../services/fields.service';

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

  private _destroyed$ = new Subject();

  constructor(private _fieldService: FieldsService, private readonly _cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this._fieldService.fields$
      .pipe(
        takeUntil(this._destroyed$),
      )
      .subscribe((fields: FormlyFieldConfig[]) => {
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

  }

  public clear(): void {
    this.fields = [];
    this._cdr.detectChanges();
  }
}
