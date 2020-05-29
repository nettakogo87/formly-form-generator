import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {

  private _formData$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('data')) || {});

  constructor() { }

  public get data$(): Observable<FormlyFieldConfig[]> {
    return this._formData$.asObservable();
  }

  public setFormData(data: any): void {
    this._formData$.next(data);
    localStorage.setItem(
      'data',
      JSON.stringify(data),
    );
  }

  public getFormData(): any {
    return this._formData$.value;
  }

  public clear(): void {
    localStorage.removeItem('data');
  }
}
