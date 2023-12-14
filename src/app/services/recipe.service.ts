import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { RecipeAddDto } from '../entity/recipe/recipe-add-dto';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly RECIPE_API_ENDPOINT = Constants.API_ENDPOINT + '/recipes';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  addRecipe(recipeAddDto: RecipeAddDto): Observable<any> {
    return this.http.post(this.RECIPE_API_ENDPOINT, recipeAddDto).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }
  getRecipeById(id: number): Observable<any> {
    const url = this.RECIPE_API_ENDPOINT + '/' + id;
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }
  getFilteredDisplayRecipes(
    rating?: number,
    category?: string,
    title?: string
  ): Observable<any> {
    
    let url = this.RECIPE_API_ENDPOINT + '/display';
    if (rating || category || title) {
      let params = new HttpParams();
      if (rating) {
        params = params.set('rating', rating);
      }
      if (category) {
        params = params.set('category', category);
      }
      if (title) {
        params=params.set('title', title);
      }
      url += `?${params.toString()}`;
    }
    console.log(url)
    return this.http.get(url).pipe(
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
