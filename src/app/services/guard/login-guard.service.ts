import { Injectable } from '@angular/core';
import { CookieServiceImpl } from '../config/cookie.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private cookieService: CookieServiceImpl, private router: Router) { }

  canActivate(): boolean{
    if(!this.cookieService.getCookie(Constants.AUTH_COOKIE))
      return true;
    else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}
