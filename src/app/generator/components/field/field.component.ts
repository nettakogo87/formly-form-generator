import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditInputDialogComponent } from '../../containers/edit-input-dialog/edit-input-dialog.component';
import { EditSelectDialogComponent } from '../../containers/edit-select-dialog/edit-select-dialog.component';
import { EditCheckboxDialogComponent } from '../../containers/edit-checkbox-dialog/edit-checkbox-dialog.component';
import { EditGroupDialogComponent } from '../../containers/edit-group-dialog/edit-group-dialog.component';
import { EditChipsDialogComponent } from '../../containers/edit-chips-dialog/edit-chips-dialog.component';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnDestroy {

  @Input()
  public field: FormlyFieldConfig;

  @Output()
  public readonly editField = new EventEmitter<FormlyFieldConfig>();

  @Output()
  public readonly removeField = new EventEmitter<FormlyFieldConfig>();

  private _destroyed$ = new Subject();

  constructor(public dialog: MatDialog) {
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public openEdit(): void {
    switch (this.field.type) {
      case 'input':
        this.dialog.open(EditInputDialogComponent, {
          width: '500px',
          data: { field: this.field },
        })
          .afterClosed()
          .pipe(
            takeUntil(this._destroyed$),
          )
          .subscribe((field: FormlyFieldConfig) => {
            if (field) {
              this.edit(field);
            }
          });
        break;
      case 'select':
        this.dialog.open(EditSelectDialogComponent, {
          width: '500px',
          data: { field: this.field },
        })
          .afterClosed()
          .pipe(
            takeUntil(this._destroyed$),
          )
          .subscribe((field: FormlyFieldConfig) => {
            if (field) {
              this.edit(field);
            }
          });
        break;
      case 'checkbox':
        this.dialog.open(EditCheckboxDialogComponent, {
          width: '500px',
          data: { field: this.field },
        })
          .afterClosed()
          .pipe(
            takeUntil(this._destroyed$),
          )
          .subscribe((field: FormlyFieldConfig) => {
            if (field) {
              this.edit(field);
            }
          });
        break;
      case 'chips-autocomplete':
        this.dialog.open(EditChipsDialogComponent, {
          width: '500px',
          data: { field: this.field },
        })
          .afterClosed()
          .pipe(
            takeUntil(this._destroyed$),
          )
          .subscribe((field: FormlyFieldConfig) => {
            if (field) {
              this.edit(field);
            }
          });
        break;
      default:
        this.dialog.open(EditGroupDialogComponent, {
          width: '800px',
          data: { field: this.field },
        })
          .afterClosed()
          .pipe(
            takeUntil(this._destroyed$),
          )
          .subscribe((field: FormlyFieldConfig) => {
            if (field) {
              this.edit(field);
            }
          });
        break;
    }
  }

  public edit(item: FormlyFieldConfig): void {
    this.editField.emit(item);
  }

  public remove(item: FormlyFieldConfig): void {
    this.removeField.emit(item);
  }
}
