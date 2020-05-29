import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditInputDialogComponent } from '../../containers/edit-input-dialog/edit-input-dialog.component';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnDestroy {

  @Input()
  public field;

  @Output()
  public editField = new EventEmitter<FormlyFieldConfig>();

  @Output()
  public removeField = new EventEmitter<FormlyFieldConfig>();

  private _destroyed$ = new Subject();

  constructor(public dialog: MatDialog) {
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public openEdit(): void {
    this.dialog.open(EditInputDialogComponent, {
      width: '250px',
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
  }

  public edit(item: FormlyFieldConfig): void {
    this.editField.emit(item);
  }

  public remove(item: FormlyFieldConfig): void {
    this.removeField.emit(item);
  }
}
