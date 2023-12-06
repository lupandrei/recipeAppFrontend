import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/entity/recipe/recipe-dto';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit  {
  recipe!:RecipeDto;
  displayData!:RecipeDisplayDto;
  selected:string='ingredients';
  constructor(private recipeService:RecipeService,private route:ActivatedRoute){}
  ngOnInit(): void {
  
    this.route.queryParams.subscribe(() => {
      console.log(window.history.state.id)
      this.recipeService.getRecipeById(window.history.state.id)
    .subscribe({
      next: (data: RecipeDto) => {
        this.recipe=data;
        this.displayData=data as RecipeDisplayDto;
      }
    })
    });
  }
  changeView(viewOption:string){
    this.selected=viewOption
  }

}
