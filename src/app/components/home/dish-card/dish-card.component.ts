import { Component, Input } from '@angular/core';
import { DishMainView } from 'src/app/entity/dish-main-view';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent {
  @Input()
  dish!:DishMainView;
}
