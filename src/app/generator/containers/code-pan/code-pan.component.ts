import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { FieldsService } from '../../services/fields.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-code-pan',
  templateUrl: './code-pan.component.html',
  styleUrls: ['./code-pan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePanComponent {

  constructor(private _fieldService: FieldsService) {
  }

  public get fields$(): Observable<FormlyFieldConfig[]> {
    return this._fieldService.fields$;
  }

  public addField(field: FormlyFieldConfig): void {
    const fields = this._fieldService.getFields();
    fields.push(field);
    this._fieldService.setFields(fields);
  }

  public editField(field: FormlyFieldConfig): void {
    const fields = this._fieldService.getFields();
    const editedFieldIndex = fields.findIndex(x => x.key === field.key);
    fields.splice(editedFieldIndex, 1, field);
    this._fieldService.setFields(fields);
  }

  public removeField(field: FormlyFieldConfig): void {
    const fields = this._fieldService.getFields();
    const removedFieldIndex = fields.findIndex(x => x.key === field.key);
    fields.splice(removedFieldIndex, 1);
    this._fieldService.setFields(fields);
  }

  public clear(): void {
    this._fieldService.clear();
  }
}
