import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDto } from '../entity/user/user-login-dto';
import { Observable, catchError, throwError } from 'rxjs';
import { UserBasicDataDto } from '../entity/user/user-basic-data-dto';
import { Constants } from '../config/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_API_ENDPOINT = Constants.API_ENDPOINT + '/users';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  login(userLoginDto: UserLoginDto): Observable<UserBasicDataDto> {
    return this.http.post<UserBasicDataDto>(this.USER_API_ENDPOINT+'/login', userLoginDto).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }))
  }

  handleError(error: HttpErrorResponse) {
    this._snackBar.open(error.error.message,'Close',{duration: 3000})
    return throwError(() => new Error(error.error.messsage));
  }
}
