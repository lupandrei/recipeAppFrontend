import { Component, Input } from '@angular/core';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent {
  @Input()
  dish!:RecipeDisplayDto;
}
