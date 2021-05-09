import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ObservedValueOf, throwError } from 'rxjs';
import { Token } from './models/token.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheapestDateSearchService {

  token: Token;
  constructor(private http: HttpClient,) { };
  airlineCode = 'IB'

httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };


  dataString = "grant_type=client_credentials&client_id=TEpS7prFYnh1yebgZHq8GAmj6pFXT1Hi&client_secret=lZCCSzRfViDqvTDq"

  getAmadeusAuthToken(): Observable<any> {
    return this.http.post<Token>('https://test.api.amadeus.com/v1/security/oauth2/token', this.dataString, this.httpOptions)
  }

  getCheckInLinksByAirlineCode(airlineCode: string, token: Token){
    airlineCode = airlineCode.trim();
    const options = {  headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`),
       params: new HttpParams().set('airlineCode', airlineCode) };
    return this.http.get("https://test.api.amadeus.com/v2/reference-data/urls/checkin-links", options);
  }





// Taken from Angular.IO seems super useful
  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else if(errorMonitor.error) {

  //   }else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
}
