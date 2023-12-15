import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  parseJwt(token: string): any {
    const base64Url: string = token.split('.')[1];
    const base64: string = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64).toString());
  }

  isCookieValid(jwt: any) {
    return !(jwt !== '' && Date.now() > this.parseJwt(jwt).exp * 1000)
  }
}
