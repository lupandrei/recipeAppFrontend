import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { JwtService } from 'src/app/services/config/jwt.service';
import { SavedRecipeService } from 'src/app/services/saved-recipe.service';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.scss']
})
export class SavedRecipesComponent implements OnInit {
  title:string="Saved Recipes";
  dishes!:RecipeDisplayDto[];
  constructor(private savedReciepsService:SavedRecipeService,private jwtService:JwtService){}
  ngOnInit(): void {
    this.savedReciepsService.getSavedRecipes(this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email')).subscribe(
      {
        next: (data:PaginatedDisplayRecipeResponse)=>{
          this.dishes=data.recipes
          console.log(this.dishes)
        }
      }
    )
  }
}
