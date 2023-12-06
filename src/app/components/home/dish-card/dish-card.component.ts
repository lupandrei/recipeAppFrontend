import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent {
  @Input()
  dish!:RecipeDisplayDto;
  constructor(private router:Router){}
  navigateToRecipe(id:number){
    // this.router.navigate([`/recipe`],{ queryParams: { id: id } })

    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/recipe`],navigationExtras);
  }
}
