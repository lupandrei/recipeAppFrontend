import { Component, Input } from '@angular/core';
import { IngredientDto } from 'src/app/entity/ingredient/Ingredient-dto';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  @Input()
  ingredients!:IngredientDto[];
}
