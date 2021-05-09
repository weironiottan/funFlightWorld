import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FlightInspirationService {

  constructor(private http: HttpClient) { }

  getFlightInspiration$(searchString: string): Observable<any>  {
    // MAD
    const options = { params: new HttpParams().set('origin', searchString) };
    return this.http.get('https://test.api.amadeus.com/v1/shopping/flight-destinations', options);
  }
}
