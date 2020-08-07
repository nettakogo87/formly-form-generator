import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SimpleChanges, ViewChild
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinDisabled, mixinErrorState } from '@angular/material/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { ExternalResourcesService } from '../../../generator/services/external-resources.service';


export class ChipsAutocompleteBase {
  constructor(
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {
  }
}

export const ChipsAutocompleteComponentMixinBase =
  mixinDisabled(mixinErrorState(ChipsAutocompleteBase));


@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ChipsAutocompleteComponent,
    },
  ],
})
export class ChipsAutocompleteComponent
  extends ChipsAutocompleteComponentMixinBase
  implements MatFormFieldControl<any>, ControlValueAccessor, OnInit, DoCheck, OnChanges, OnDestroy {

  @Input()
  public resource: string;

  @Input()
  public labelProp: string;

  @Input()
  public valueProp: string;

  @Input()
  public placeholder: string;

  @Input()
  public disabled: boolean;

  @Input()
  public value;

  @Input()
  public required = false;

  @Input()
  public multi = false;

  @Input()
  public removable = false;

  @Input('filteredItems')
  public filteredItems$: Observable<any[]>;

  public readonly focused = false;
  public readonly controlType = 'app-chips-autocomplete';
  public readonly id = `app-chips-autocomplete-${ChipsAutocompleteComponent._nextId++}`;
  public readonly autofilled: boolean;
  public describedBy = '';


  public itemsCtrl = new FormControl('');

  protected _onChange = (value: any) => {};
  protected _onTouched = () => {};

  @ViewChild('chipList')
  public chipList;

  @ViewChild('itemsInput')
  public itemsInput: ElementRef;

  @HostBinding('class.floating')
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  private static _nextId = 0;

  constructor(@Optional() @Self() public ngControl: NgControl,
              @Optional() public _parentForm: NgForm,
              @Optional() public _parentFormGroup: FormGroupDirective,
              public _defaultErrorStateMatcher: ErrorStateMatcher,
              private _changeDetectorRef: ChangeDetectorRef,
              private elRef: ElementRef<HTMLElement>,
              private _externalResourcesService: ExternalResourcesService,
  ) {
    super(_parentForm, _parentFormGroup, ngControl, _defaultErrorStateMatcher);
    this.ngControl.valueAccessor = this;
  }

  public get empty(): boolean {
    return !this.itemsCtrl.value && (this.value.length === 0);
  }

  public ngOnInit(): void {
    // this.selectedItems$ = this.itemsCtrl.valueChanges;


    this.filteredItems$ = this.itemsCtrl.valueChanges
      .pipe(
        startWith(''),
        switchMap((value: string) => {
          const params: any = {};
          params[this.valueProp] = value;
          return this._externalResourcesService.getOptions(this.resource, params);
        }),
        map((foundItems: any[]) => {
          let result = [];
          if (this.value) {
            result = foundItems.filter((foundItem: any) => {
              return !this.value.slice()
                .find((selectedItem: any) => selectedItem[this.labelProp] === foundItem[this.labelProp]);
            });
          } else {
            result = foundItems;
          }
          return result;
        }),
      );
  }

  public ngDoCheck(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.stateChanges.next();
    }
  }

  public ngOnDestroy(): void {
    this.updateErrorState();
  }

  public onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input')!.focus();
    }
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.itemsCtrl.disable();
      this.disabled = true;
    } else {
      this.itemsCtrl.enable();
      this.disabled = false;
    }
    this.stateChanges.next();
  }

  public writeValue(items: any[]): void {
    this.value = items || [];
  }

  public select(event: MatAutocompleteSelectedEvent): void {
    let items = [];
    if (this.value) {
      items = this.value.slice();
    }
    items.push(event.option.value);
    this.itemsInput.nativeElement.value = '';
    this.itemsCtrl.setValue(null);
    this.value = items;
  }

  public removeByIndex(index: number): void {
    let items = [];
    if (this.value) {
      items = this.value.slice();
      items.splice(index, 1);
    }
    this.itemsCtrl.setValue('');
    this.value = items;
  }
}
