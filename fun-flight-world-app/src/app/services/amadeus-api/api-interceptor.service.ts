import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap} from 'rxjs/operators';
import { Token } from 'src/app/models/token.model';
import { AuthTokenService } from './auth-token.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: Token;
  idTokenPresent = false;
  authRequest: any;
  idToken: string | string[] | null;
  testreq: any;
  hasTokenBeenUsed = false;
  constructor(private authTokenService: AuthTokenService) {}

  // tslint:disable-next-line: typedef
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const amadeusToken = localStorage.getItem('amadeusToken');

    const tokenExpirationDate = new Date(localStorage.getItem('amadeusTokenExpirationDate') || '');

    if (!!amadeusToken && this.authTokenService.checkIfTokenisExpired(tokenExpirationDate)) {
      console.log('Get Old Token');
      this.authRequest = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + amadeusToken)
         });
      return next.handle(this.authRequest);
    }

    return next.handle(req).pipe(
      catchError(( _response: HttpErrorResponse) => {
        return this.authTokenService.getAmadeusAuthToken$().pipe(
          switchMap(token => {
            console.log(token, 'amadeus_token get a new token');
            this.authRequest = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token.access_token)
             });
            localStorage.setItem('amadeusTokenExpirationDate', new Date().toString());
            localStorage.setItem('amadeusToken', token.access_token);
            return next.handle(this.authRequest);
          })
        );
      }
    )
    );
  }

}

  //     // catchError((response: HttpErrorResponse) => {
  //     //   let token = ""
  //     //    this.authTokenService.getAmadeusAuthToken$().subscribe( token => {
  //     //     token = token
  //     //     console.log(token)
  //     //   })
  //     //   console.log(token);
  //     //    const authReq = req.clone({
  //     //         headers: req.headers.append('Authorization', 'Bearer ' + "lkVkfilWizfcuyVpXBQsA08XkUy5")
  //     //       });
  //     //   return next.handle(authReq);
  //     // })
      // catchError((response: HttpErrorResponse) => {
      //   console.log(this.idTokenPresent, 'this.idTokenPresent')
      //   if(!this.idTokenPresent){
      //     this.authTokenService.getAmadeusAuthToken$().subscribe(token => {
          //   this.authRequest = req.clone({
          //   headers: req.headers.append('Authorization', 'Bearer ' + token.access_token)
          //  });
          //  localStorage.setItem('id_token', token.access_token)
      //      this.idTokenPresent = true;
      //      console.log(this.idTokenPresent, "what is the status")
      //     })
        // }
