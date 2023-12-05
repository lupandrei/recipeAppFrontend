import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/entity/recipe/recipe-dto';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit  {
  recipe!:RecipeDto;

  constructor(private recipeService:RecipeService,private route:ActivatedRoute){}
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.recipeService.getRecipeById(params['id'])
    .subscribe({
      next: (data: RecipeDto) => {
        this.recipe=data;
        console.log(this.recipe)
      }
    })
    });
    
  }

}
