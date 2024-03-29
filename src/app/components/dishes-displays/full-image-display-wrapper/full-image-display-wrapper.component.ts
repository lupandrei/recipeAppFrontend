import { Component, Input, OnInit } from '@angular/core';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { mockMeals } from 'src/app/mock-data/mock-meals';
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-full-image-display-wrapper',
  templateUrl: './full-image-display-wrapper.component.html',
  styleUrls: ['./full-image-display-wrapper.component.scss']
})
export class FullImageDisplayWrapperComponent  {

  @Input()
  showTitle!:boolean;
  @Input()
  dishes!:RecipeDisplayDto[];
  constructor(private recipeService:RecipeService){};

 

}
