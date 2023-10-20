import { Component, Input, OnInit } from '@angular/core';
import { DishExtended } from 'src/app/entity/dish-extended';
import { DishMainView } from 'src/app/entity/dish-main-view';
import { mockMeal } from 'src/app/mock-data/mock-meal-extended';
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit  {
  dish!:DishExtended;
  ngOnInit(): void {
    this.dish=mockMeal;
  }

}
