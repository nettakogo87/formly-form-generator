import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EditInputDialogComponent } from '../edit-input-dialog/edit-input-dialog.component';

@Component({
  selector: 'app-edit-select-dialog',
  templateUrl: './edit-select-dialog.component.html',
  styleUrls: ['./edit-select-dialog.component.scss'],
})
export class EditSelectDialogComponent {

  public field: FormlyFieldConfig;

  constructor(
    public dialogRef: MatDialogRef<EditSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { field: FormlyFieldConfig }) {
    this.field = this.data.field;
  }

  public edit(field: FormlyFieldConfig): void {
    this.dialogRef.close(field);
  }
}
