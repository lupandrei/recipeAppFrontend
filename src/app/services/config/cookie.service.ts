import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceImpl {

  constructor(private cookieService: CookieService) { }

  getCookie(cookie: string) {
    return this.cookieService.get(cookie);
  }


}
