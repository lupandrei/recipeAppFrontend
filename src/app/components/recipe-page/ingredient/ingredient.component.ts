import { Component, Input } from '@angular/core';
import { IngredientDto } from 'src/app/entity/ingredient/Ingredient-dto';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent {
  @Input()
  ingredient!:IngredientDto;
}
