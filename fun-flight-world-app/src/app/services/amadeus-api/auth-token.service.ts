import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token.model';

@Injectable({
  providedIn: 'root'
})

export class AuthTokenService {

  token: Token;
  constructor(private http: HttpClient) { }

  body = 'grant_type=client_credentials&client_id=TEpS7prFYnh1yebgZHq8GAmj6pFXT1Hi&client_secret=lZCCSzRfViDqvTDq';

  getAmadeusAuthToken$(): Observable<any>{
    const httpOptions = {  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    return this.http.post<Token>('https://test.api.amadeus.com/v1/security/oauth2/token', this.body, httpOptions);
  }

  checkIfTokenisExpired(tokenExpirationDate: Date): boolean {
    let  dateDifferenceInMinutes = new Date().getTime() - tokenExpirationDate.getTime();
    dateDifferenceInMinutes = dateDifferenceInMinutes / 60000;
    return dateDifferenceInMinutes > 25 ? false : true;
  }

}
