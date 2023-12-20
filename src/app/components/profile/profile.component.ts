import { Component, OnInit } from '@angular/core';
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
  title:string="Profile";
  dishes!:RecipeDisplayDto[]
  email!:string;
  constructor(private recipeService:RecipeService,private jwtService:JwtService,private route:ActivatedRoute){}
  ngOnInit(): void {  
    this.route.queryParamMap.subscribe(()=>{
      this.email = window.history.state.email ? window.history.state.email
                  :this.jwtService.getCookieField(Constants.AUTH_COOKIE, 'email');
      console.log(this.email)
      this.recipeService.getFilteredDisplayRecipes(undefined,undefined,undefined,this.email).subscribe(
        {
          next :(data:PaginatedDisplayRecipeResponse) =>{
            this.dishes=data.recipes;
          } 
        }
      )
    })
   
  }

}
