import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'app-formly-chips-autocomplete',
  templateUrl: './formly-chips-autocomplete.component.html',
  styleUrls: ['./formly-chips-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyChipsAutocompleteComponent extends FieldType {

  constructor() {
    super();
  }

  public get label(): string {
    return this.field.templateOptions.label;
  }

  public get placeholder(): string {
    return this.field.templateOptions.placeholder;
  }

  public get multi(): boolean {
    return this.field.templateOptions.multi;
  }

  public get required(): boolean {
    return this.field.templateOptions.required;
  }

  public get removable(): boolean {
    return this.field.templateOptions.removable;
  }

  public get disabled(): boolean {
    return this.field.templateOptions.disabled;
  }

  public get labelProp(): string {
    return this.field.templateOptions.labelProp;
  }

  public get valueProp(): string {
    return this.field.templateOptions.valueProp;
  }

  public get messages(): string[] {
    return [];
  }
}
