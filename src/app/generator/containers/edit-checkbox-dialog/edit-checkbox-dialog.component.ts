import { Component, Inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-checkbox-dialog',
  templateUrl: './edit-checkbox-dialog.component.html',
  styleUrls: ['./edit-checkbox-dialog.component.scss']
})
export class EditCheckboxDialogComponent {

  public field: FormlyFieldConfig;

  constructor(
    public dialogRef: MatDialogRef<EditCheckboxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { field: FormlyFieldConfig }) {
    this.field = this.data.field;
  }

  public edit(field: EditCheckboxDialogComponent): void {
    this.dialogRef.close(field);
  }
}
