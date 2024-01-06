import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { JwtService } from 'src/app/services/config/jwt.service';
import { StompService } from 'src/app/services/config/stomp.service';
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
  count!:number;
  constructor(private recipeService:RecipeService,private stompService:StompService,private jwtService:JwtService){}
  showEventHandle($event:any){
    this.show=$event;
  }
  animationDoneEventHandle($event:any){
    this.animationDone=$event;
  }
  ngOnInit(): void {
    let userEmail = this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email');
    this.stompService.getNotificationsCountObservable(userEmail).subscribe(
      (count) => {
        console.log(`Notifications count for ${userEmail}: ${count}`);
        this.count=count
        // Update your UI or perform any action based on the count
      }
    );
    this.recipeService.getFilteredDisplayRecipes()
   .subscribe({
     next: (data: PaginatedDisplayRecipeResponse) => {
       this.dishes=data.recipes
     }
   })
 }
}
