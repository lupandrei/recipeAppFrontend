import { Component, Input } from '@angular/core';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';

@Component({
  selector: 'app-full-image-display',
  templateUrl: './full-image-display.component.html',
  styleUrls: ['./full-image-display.component.scss']
})
export class FullImageDisplayComponent {
  @Input()
  dish!:RecipeDisplayDto;
}
