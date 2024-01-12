import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { CookieServiceImpl } from './cookie.service';
import { Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieServiceImpl, private jwtService: JwtService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes("login") && !req.url.includes("assets")) {
      const jwt = this.cookieService.getCookie(Constants.AUTH_COOKIE);
      if (!this.jwtService.isCookieValid(jwt)) {
        return EMPTY;
      }
      req = this.setHeader(req,jwt)
    }
    return next.handle(req);
  }

  setHeader(req:HttpRequest<any>,jwt:any){
    const header = {
      "app-auth": jwt
    }
    return req.clone({
      setHeaders: header
    })
  }

}

