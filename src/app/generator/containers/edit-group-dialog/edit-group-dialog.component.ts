import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGroupDialogComponent {

  public field: FormlyFieldConfig;

  constructor(
    public dialogRef: MatDialogRef<EditGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { field: FormlyFieldConfig }) {
    this.field = this.data.field;
  }

  public saveFieldData(field: FormlyFieldConfig): void {
    const fieldGroup = this.field.fieldGroup;
    this.field = field;
    this.field.fieldGroup = fieldGroup;
  }


  public addField(field: FormlyFieldConfig): void {
    this.field.fieldGroup.push(field);
  }

  public editField(field: FormlyFieldConfig): void {
    const fields = this.field.fieldGroup;
    const editedFieldIndex = fields.findIndex(x => x.key === field.key);
    fields.splice(editedFieldIndex, 1, field);
  }

  public removeField(field: FormlyFieldConfig): void {
    const fields = this.field.fieldGroup;
    const removedFieldIndex = fields.findIndex(x => x.key === field.key);
    fields.splice(removedFieldIndex, 1);
  }

  public save(): void {
    this.dialogRef.close(this.field);
  }
}
