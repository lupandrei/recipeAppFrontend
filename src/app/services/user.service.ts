import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDto } from '../entity/user/user-login-dto';
import { Observable, catchError, throwError } from 'rxjs';
import { UserBasicDataDto } from '../entity/user/user-basic-data-dto';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_API_ENDPOINT = Constants.API_ENDPOINT + '/user';
  constructor(private http: HttpClient) { }

  login(userLoginDto: UserLoginDto): Observable<UserBasicDataDto> {
    return this.http.post<UserBasicDataDto>(this.USER_API_ENDPOINT,userLoginDto).pipe(
      catchError((error: HttpErrorResponse)=>
      {
        if(error.status === 401) {
          console.log("Unauthorized error");
        }
        return throwError(()=>error)
      }))
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg = '';

    if (error?.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = error.message;
    }

    return throwError(() => new Error(errorMsg));
  }
}
