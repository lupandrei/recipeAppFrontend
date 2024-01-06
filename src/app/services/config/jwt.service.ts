import { Injectable } from '@angular/core';
import { CookieServiceImpl } from './cookie.service';
import { Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private cookieService: CookieServiceImpl) { }
  parseJwt(token: string): any {
    const base64Url: string = token.split('.')[1];
    const base64: string = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64).toString());
  }

  isCookieValid(jwt: any) {
    return !(jwt !== '' && Date.now() > this.parseJwt(jwt).exp * 1000)
  }

  getCookieField(cookie: string, field: string) {
    try{
      return this.parseJwt(this.cookieService.getCookie(cookie))[field]
    }
    catch{
      return null
    }
    
  }
  isCurrentUser(userEmail:string){
    return this.getCookieField(Constants.AUTH_COOKIE,'email') === userEmail
  }
}
