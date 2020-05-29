import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';


@Injectable({
  providedIn: 'root',
})
export class FieldsService {

  private _fields$ = new BehaviorSubject<FormlyFieldConfig[]>(JSON.parse(localStorage.getItem('fields')) || []);

  constructor() {
  }

  public get fields$(): Observable<FormlyFieldConfig[]> {
    return this._fields$.asObservable();
  }

  public setFields(fields: FormlyFieldConfig[]): void {
    this._fields$.next(fields);
    localStorage.setItem(
      'fields',
      JSON.stringify(fields),
    );
  }

  public getFields(): FormlyFieldConfig[] {
    return this._fields$.value.slice();
  }
}
