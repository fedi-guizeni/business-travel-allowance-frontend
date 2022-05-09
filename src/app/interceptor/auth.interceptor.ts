import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authentificationService:AuthenticationService) {}

  //check    the url if public_url continue else add the authorization
  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
     if (httpRequest.url.includes(`${ this.authentificationService.host}/user/login` )) {
       return httpHandler.handle(httpRequest);
       
     }
     if (httpRequest.url.includes(`${ this.authentificationService.host}/user/register` )) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${ this.authentificationService.host}/user/resetpassword` )) {
      return httpHandler.handle(httpRequest);
      
    }
    this.authentificationService.loadToken()
    const token = this.authentificationService.getToken();
    //httpRequest immutable we make a clone than pass it 
    const request = httpRequest.clone({setHeaders: {Authorization:`Bearer ${token}`}});
    return httpHandler.handle(request); 
  }
}
