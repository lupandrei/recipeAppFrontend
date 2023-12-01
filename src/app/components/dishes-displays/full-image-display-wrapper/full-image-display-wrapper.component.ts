import { Component, OnInit } from '@angular/core';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { mockMeals } from 'src/app/mock-data/mock-meals';
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-full-image-display-wrapper',
  templateUrl: './full-image-display-wrapper.component.html',
  styleUrls: ['./full-image-display-wrapper.component.scss']
})
export class FullImageDisplayWrapperComponent implements OnInit {
  dishes!:RecipeDisplayDto[];
  constructor(private recipeService:RecipeService){};

  ngOnInit(): void {
     this.recipeService.getFilteredDisplayRecipes()
    .subscribe({
      next: (data: PaginatedDisplayRecipeResponse) => {
        console.log(data)
        this.dishes=data.recipes
      }
    })
  }

}
