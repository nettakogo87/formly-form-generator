import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-edit-input-dialog',
  templateUrl: './edit-input-dialog.component.html',
  styleUrls: ['./edit-input-dialog.component.scss'],
})
export class EditInputDialogComponent {

  public field: FormlyFieldConfig;

  constructor(
    public dialogRef: MatDialogRef<EditInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { field: FormlyFieldConfig }) {
    this.field = this.data.field;
  }

  public edit(field: FormlyFieldConfig): void {
    this.dialogRef.close(field);
  }
}
