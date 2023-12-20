import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtService } from './config/jwt.service';
import { Observable, catchError, throwError } from 'rxjs';
import { FollowingResponseDto } from '../entity/following/following-response-dto';
import { FollowingDto } from '../entity/following/following-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  private readonly FOLLOWING_API_ENDPOINT = Constants.API_ENDPOINT + '/followers';
  constructor(private http:HttpClient,private jwtService:JwtService, private _snackBar: MatSnackBar) { }

  followUser(following:string):Observable<FollowingResponseDto>{
      const follower = this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email');
      const followingDto: FollowingDto = {
        follower: follower,
        following: following,
      };
      return this.http.post<FollowingResponseDto>(this.FOLLOWING_API_ENDPOINT, followingDto).pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(error);
        }))
  }
  unfollowUser(unfollowing:string):Observable<any>{
    const unfollower = this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email');
    const followingDto: FollowingDto = {
      follower: unfollower,
      following: unfollowing,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:followingDto,
    };
    return this.http.delete(this.FOLLOWING_API_ENDPOINT,options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }))
  }
  
  handleError(error: HttpErrorResponse) {
    this._snackBar.open(error.error.message, 'Close', { duration: 3000 });
    return throwError(() => new Error(error.error.messsage));
  }

}
