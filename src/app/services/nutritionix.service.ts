import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { IngredientDto } from '../entity/ingredient/Ingredient-dto';

@Injectable({
  providedIn: 'root'
})
export class NutritionixService {

  private apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
  private headers = new HttpHeaders({
    'x-app-id': 'ba7fcddc',
    'x-app-key': '0867cb0a85f8c1e1691235d50d3fd6b8'
  });

  constructor(private http: HttpClient) { }

  getMacronutrients(ingredients: IngredientDto[]): Observable<any> {
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCalories = 0;

    const requests = ingredients.map(ingredient => {
      const body = {
        query: ingredient.name
      };

      return this.http.post<any>(this.apiUrl, body, { headers: this.headers });
    });
    return forkJoin(requests).pipe(
      map(responses => {
        responses.forEach((response, index) => {
          const ingredient = ingredients[index];
          const altMeasure = this.findMatchingAltMeasure(response.foods[0].alt_measures, 'g');
          console.log(altMeasure)
          if (altMeasure) {
            const conversionFactor = ingredient.quantity / altMeasure.qty;
            totalProtein += response.foods[0].nf_protein * conversionFactor;
            totalCarbs += response.foods[0].nf_total_carbohydrate * conversionFactor;
            totalFats += response.foods[0].nf_total_fat * conversionFactor;
            totalCalories += response.foods[0].nf_calories * conversionFactor;
          }
        });

        return {
          totalProtein: Math.round(totalProtein),
          totalCarbs: Math.round(totalCarbs),
          totalFats: Math.round(totalFats),
          totalCalories: Math.round(totalCalories)
        };
      })
    );
  }

  private findMatchingAltMeasure(altMeasures: any[], unit: string): any {
    return altMeasures.find(measure => measure.measure.toLowerCase() === unit.toLowerCase());
  }
}
