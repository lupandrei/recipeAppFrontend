import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MetDto } from '../entity/macro/met-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MetService {
  private readonly MET_API_ENDPOINT = Constants.MET_CALCULATOR_ENDPOINT;
  constructor(private http:HttpClient,private _snackBar:MatSnackBar) { }

  getDurations(metDto:MetDto):Observable<any>{
    return this.http.post(`${this.MET_API_ENDPOINT}/calculate_durations`,metDto).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }
  handleError(error: HttpErrorResponse) {
    this._snackBar.open(error.error.message, 'Close', { duration: 3000 });
    return throwError(() => new Error(error.error.messsage));
  }
}
