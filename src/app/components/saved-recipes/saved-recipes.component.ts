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
  loading:boolean=false;
  disabled:boolean=false;
  page:number=0;
  size:number=5;
  totalSize!:number;
  title:string="Saved Recipes";
  dishes!:RecipeDisplayDto[];
  constructor(private savedReciepsService:SavedRecipeService,private jwtService:JwtService){}
  ngOnInit(): void {
    this.savedReciepsService.getSavedRecipes(this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email'),
    this.page,this.size).subscribe(
      {
        next: (data:PaginatedDisplayRecipeResponse)=>{
          this.totalSize=data.numberOfRecipes
          this.dishes=data.recipes
        }
      }
    )
  }
  toggleLoading =() => this.loading = !this.loading;
  onScroll = () =>{
    this.page++;
    if(this.page*this.size<this.totalSize)
      this.loadMoreRecipes();
    else
      this.disabled=true;
  } 

  loadMoreRecipes(): void {
    this.toggleLoading();
    this.savedReciepsService.getSavedRecipes(this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email'),
    this.page,this.size).subscribe(
      {
        next: (data: PaginatedDisplayRecipeResponse) => {
          this.dishes = this.dishes.concat(data.recipes); 
        },
        error: (error: any) => {
          console.error('Error loading more recipes:', error);
        },
        complete: ()=> this.toggleLoading()
      }
    );
  }
  
}
