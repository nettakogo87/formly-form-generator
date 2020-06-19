import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-chips-dialog',
  templateUrl: './edit-chips-dialog.component.html',
  styleUrls: ['./edit-chips-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditChipsDialogComponent {

  public field: FormlyFieldConfig;

  constructor(
    public dialogRef: MatDialogRef<EditChipsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { field: FormlyFieldConfig }) {
    this.field = this.data.field;
  }

  public edit(field: FormlyFieldConfig): void {
    this.dialogRef.close(field);
  }
}
