import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-full-image-display-carousel-wrapper',
  templateUrl: './full-image-display-carousel-wrapper.component.html',
  styleUrls: ['./full-image-display-carousel-wrapper.component.scss']
})
export class FullImageDisplayCarouselWrapperComponent {
  @Input()
  showTitle!:boolean;
  dishes!: RecipeDisplayDto[];
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplayHoverPause:true,
    navSpeed: 400,
    navText: ['', ''],
    //nav: true,
    margin:10,
    responsive: {
      0: {
        items: 1
      },
      500:{
        items:2
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
