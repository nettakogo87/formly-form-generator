import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExternalResourcesService {

  constructor(private _http: HttpClient) {
  }

  public getOptions(url: string, params: any = {}): Observable<any[]> {
    return this._http.get(url, { params: params })
      .pipe(
        map(options => {
          return options as any[];
        }),
      );
  }
}
