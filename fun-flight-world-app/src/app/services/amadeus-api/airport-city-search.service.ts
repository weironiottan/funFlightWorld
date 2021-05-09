import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AirportCitySearchService {

  constructor(private http: HttpClient) { }

  getAirportName$(userSearchString: string): Observable<any>  {
    const options = { params: new HttpParams()
      .set('subType', 'AIRPORT')
      .set('keyword', userSearchString)
     };
    return this.http.get('https://test.api.amadeus.com/v1/reference-data/locations?', options);
  }
}
