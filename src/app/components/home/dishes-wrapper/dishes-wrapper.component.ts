import { Component,  OnInit } from '@angular/core';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { mockMeals } from 'src/app/mock-data/mock-meals';
import * as $ from 'jquery';
import { RecipeService } from 'src/app/services/recipe.service';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
@Component({
  selector: 'app-dishes-wrapper',
  templateUrl: './dishes-wrapper.component.html',
  styleUrls: ['./dishes-wrapper.component.scss'],
})
export class DishesWrapperComponent implements OnInit {
  dishes!: RecipeDisplayDto[];
  scrollPosition:number=0;
  carouselWidth:any;
  cardWidth:any;

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

  ngAfterViewInit() {
    this.carouselWidth = $('.carousel-inner')[0].scrollWidth;
    this.cardWidth =$('.carousel-item').width();
  }

  navigate(pos:string){
    console.log('enters')
    if(pos==='next' && this.scrollPosition<this.carouselWidth-this.cardWidth){
      this.scrollPosition+=this.cardWidth;
      $('.carousel-inner').animate({scrollLeft:this.scrollPosition},600);
    }
   
    if(pos==='prev' &&this.scrollPosition>0){
      this.scrollPosition-=this.cardWidth
      $('.carousel-inner').animate({scrollLeft:this.scrollPosition},600);
    }
  }
}
