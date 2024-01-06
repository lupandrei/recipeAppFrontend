import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { RecipeAddDto } from '../entity/recipe/recipe-add-dto';
import { RecipeUpdateDto } from '../entity/recipe/recipe-update-dto';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  
 

  private readonly RECIPE_API_ENDPOINT = Constants.API_ENDPOINT + '/recipes';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  deleteRecipe(id: number) {
    const url = `${this.RECIPE_API_ENDPOINT}/${id}`;
    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }))
  }
  addReview(newReview:any):Observable<any> {
    const url = `${this.RECIPE_API_ENDPOINT}/${newReview.id}/reviews`;
    return this.http.post(url, newReview).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  getRecipeReviews(id:number): Observable<any>{
    const url = `${this.RECIPE_API_ENDPOINT}/${id}/reviews`;
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }
  updateRecipe(recipeUpdateDto:RecipeUpdateDto,id:number):Observable<any>{
    console.log(recipeUpdateDto)
    const url = `${this.RECIPE_API_ENDPOINT}/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:recipeUpdateDto,
    };
    return this.http.put(url,recipeUpdateDto).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }
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
    title?: string,
    email?: string
  ): Observable<any> {

    let url = this.RECIPE_API_ENDPOINT + '/display';
    if (rating || category || title ||email) {
      let params = new HttpParams();
      if (rating) {
        params = params.set('rating', rating);
      }
      if (category) {
        params = params.set('category', category);
      }
      if (title) {
        params = params.set('title', title);
      }
      if (email) {
        params = params.set('email', email);
      }
      url += `?${params.toString()}`;
    }
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
