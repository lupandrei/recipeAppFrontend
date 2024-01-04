import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { RecipeSaveDto } from '../entity/recipe-saved/recipe-save-dto';

@Injectable({
  providedIn: 'root'
})
export class SavedRecipeService {

  private readonly SAVED_RECIPE_API_ENDPOINT = Constants.API_ENDPOINT + '/save-recipe';
  constructor(private http:HttpClient,private _snackBar:MatSnackBar) { }

  getSavedRecipes(email:string):Observable<any>{
    const url = `${this.SAVED_RECIPE_API_ENDPOINT}?email=${email}`
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }))
  }

  removeSavedRecipe(idRecipe: number):Observable<any> {
    const url = `${this.SAVED_RECIPE_API_ENDPOINT}/${idRecipe}`;
    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }))
  }

  saveRecipe(recipeSaveDto:RecipeSaveDto):Observable<any>{
    return this.http.post(this.SAVED_RECIPE_API_ENDPOINT, recipeSaveDto).pipe(
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
