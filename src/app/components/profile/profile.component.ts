import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeDto } from 'src/app/entity/recipe/recipe-dto';
import { JwtService } from 'src/app/services/config/jwt.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  size:number=5;
  totalSize!:number;
  page:number=0;
  title:string="Profile";
  loading:boolean=false;
  dishes!:RecipeDisplayDto[]
  email!:string;
  disabled:boolean=false;
  constructor(private recipeService:RecipeService,private jwtService:JwtService,private route:ActivatedRoute){}

  ngOnInit(): void {  
    window.scrollTo(0, 0);
    this.route.queryParamMap.subscribe(()=>{
      console.log(window.history.state.email)
      this.email = window.history.state.email ? window.history.state.email
                  :this.jwtService.getCookieField(Constants.AUTH_COOKIE, 'email');
      this.toggleLoading();
      this.recipeService.getFilteredDisplayRecipes(undefined,undefined,undefined,this.email,this.page,this.size).subscribe(
        {
          next :(data:PaginatedDisplayRecipeResponse) =>{
            this.dishes=data.recipes;
            this.totalSize=data.numberOfRecipes;
          },
          complete :()=> this.toggleLoading()
        }
      )
    })
   
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
    this.recipeService.getFilteredDisplayRecipes(undefined, undefined, undefined, this.email,this.page,this.size).subscribe(
      {
        next: (data: PaginatedDisplayRecipeResponse) => {
          this.dishes = this.dishes.concat(data.recipes); // Append new recipes to the existing list
        },
        error: (error: any) => {
          console.error('Error loading more recipes:', error);
        },
        complete: ()=> this.toggleLoading()
      }
    );
  }

}
