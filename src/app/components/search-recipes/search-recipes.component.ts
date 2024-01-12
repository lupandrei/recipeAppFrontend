import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { fadeIn } from 'ng-animate';
import { Subject } from 'rxjs';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 0.5, delay: 0}
    }))])
  ],

})
export class SearchRecipesComponent{
  fadeIn:any;
  dishes!:RecipeDisplayDto[];
  searchSubject=new Subject<string>();

  constructor(){}
  handleDishesEvent($event:any){
    this.dishes=$event
 }
}
