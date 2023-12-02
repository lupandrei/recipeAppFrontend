import { Component,  OnInit, ViewChild } from '@angular/core';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { OwlOptions } from 'ngx-owl-carousel-o';
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

  customOptions: OwlOptions = {
    loop: true,
    autoplay:false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin:10,
    navSpeed: 700,
    navText: ['', ''],
    //nav: true,
    responsive: {
      0: {
        items: 1
      },
      320: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    
  }
  constructor(private recipeService:RecipeService){};
  ngOnInit(): void {
     this.recipeService.getFilteredDisplayRecipes()
    .subscribe({
      next: (data: PaginatedDisplayRecipeResponse) => {
        this.dishes=data.recipes
      }
    })
  }
}
