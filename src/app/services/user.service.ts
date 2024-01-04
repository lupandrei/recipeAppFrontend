import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDto } from '../entity/user/user-login-dto';
import { Observable, catchError, throwError } from 'rxjs';
import { UserBasicDataDto } from '../entity/user/user-basic-data-dto';
import { Constants } from '../config/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatedUsersReponse } from '../entity/user/paginated-user-response';
import { UserFollowingDto } from '../entity/following/user-following';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_API_ENDPOINT = Constants.API_ENDPOINT + '/users';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  login(userLoginDto: UserLoginDto): Observable<String> {
    return this.http.post<String>(this.USER_API_ENDPOINT+'/login', userLoginDto,{withCredentials:true}).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }))
  }

  getUserFollowing(email:string):Observable<UserFollowingDto>{
    return this.http.get<UserFollowingDto>(`${this.USER_API_ENDPOINT}/following-info?email=${email}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }))
  }
  getUsersByEmail(email:string,followed:boolean,follower:boolean,emailUserProfile:string):Observable<PaginatedUsersReponse>{
    let url;
    if(follower!=undefined && followed!=undefined && emailUserProfile)
      url = `${this.USER_API_ENDPOINT}?email=${email}&follower=${follower}&followed=${followed}&emailUserProfile=${emailUserProfile}`;
    else{
      url = `${this.USER_API_ENDPOINT}?email=${email}`;
    }
    return this.http.get<PaginatedUsersReponse>(url).pipe(
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
