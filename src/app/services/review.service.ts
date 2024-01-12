import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from '../config/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly REVIEW_API_ENDPOINT = Constants.API_ENDPOINT + '/reviews';
  constructor(private http:HttpClient,private _snackBar:MatSnackBar) { }

  updateReview(newReview: { id: number; reviewText: string; rating: number; time: string; email: string; }) {
    const url =`${this.REVIEW_API_ENDPOINT}/${newReview.id}`
    return this.http.put(url,newReview).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    )
  }

  deleteReview(idReview: number):Observable<any> {
    const url = `${this.REVIEW_API_ENDPOINT}/${idReview}`;
    return this.http.delete(url).pipe(
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
