import { Component, Input } from '@angular/core';
import { DishMainView } from 'src/app/entity/dish-main-view';

@Component({
  selector: 'app-full-image-display',
  templateUrl: './full-image-display.component.html',
  styleUrls: ['./full-image-display.component.scss']
})
export class FullImageDisplayComponent {
  @Input()
  dish!:DishMainView;
}
