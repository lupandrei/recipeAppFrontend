import { Component, OnInit } from '@angular/core';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit{
  show:boolean=false;
  animationDone:boolean=true;
  dishes!:RecipeDisplayDto[];
  constructor(private recipeService:RecipeService){}
  showEventHandle($event:any){
    this.show=$event;
  }
  animationDoneEventHandle($event:any){
    this.animationDone=$event;
  }
  ngOnInit(): void {
    this.recipeService.getFilteredDisplayRecipes()
   .subscribe({
     next: (data: PaginatedDisplayRecipeResponse) => {
       this.dishes=data.recipes
     }
   })
 }
}
