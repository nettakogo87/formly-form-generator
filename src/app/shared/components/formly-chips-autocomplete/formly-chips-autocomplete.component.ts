import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ExternalResourcesService } from '../../../generator/services/external-resources.service';


@Component({
  selector: 'app-formly-chips-autocomplete',
  templateUrl: './formly-chips-autocomplete.component.html',
  styleUrls: ['./formly-chips-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyChipsAutocompleteComponent extends FieldType implements OnInit {

  public filteredItems$: Observable<any[]>;
  public selectedItems$: Observable<any[]>;

  public itemsCtrl = new FormControl('');

  @ViewChild('itemsInput')
  public itemsInput: ElementRef;

  constructor(private _externalResourcesService: ExternalResourcesService) {
    super();
  }

  public get label(): string {
    return this.field.templateOptions.label;
  }

  public get placeholder(): string {
    return this.field.templateOptions.placeholder;
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

  public ngOnInit(): void {
    this.selectedItems$ = this.formControl.valueChanges;

    this.filteredItems$ = this.itemsCtrl.valueChanges
      .pipe(
        startWith(''),
        switchMap((value: string) => {
          const params: any = {};
          params[this.valueProp] = value;
          return this._externalResourcesService.getOptions(this.field.templateOptions.resource, params);
        }),
        map((foundItems: any[]) => {
          if (this.formControl.value) {
            return foundItems.filter((foundItem: any) => {
              return !this.formControl.value.slice()
                .find((selectedItem: any) => selectedItem[this.valueProp] === foundItem[this.valueProp]);
            });
          } else {
            return foundItems;
          }
        }),
      );
  }

  public select(event: MatAutocompleteSelectedEvent): void {
    let items = [];
    if (this.formControl.value) {
      items = this.formControl.value.slice();
    }
    items.push(event.option.value);
    this.itemsInput.nativeElement.value = '';
    this.itemsCtrl.setValue(null);
    this.formControl.setValue(items);
  }


  public removeByIndex(index: number): void {
    let items = [];
    if (this.formControl.value) {
      items = this.formControl.value.slice();
      items.splice(index, 1);
    }
    this.itemsCtrl.setValue('');
    this.formControl.setValue(items);
  }
}
