import { Component, OnInit } from '@angular/core';
import { DishMainView } from 'src/app/entity/dish-main-view';
import { mockMeals } from 'src/app/mock-data/mock-meals';
@Component({
  selector: 'app-full-image-display-wrapper',
  templateUrl: './full-image-display-wrapper.component.html',
  styleUrls: ['./full-image-display-wrapper.component.scss']
})
export class FullImageDisplayWrapperComponent implements OnInit {
  dishes!:DishMainView[];
  ngOnInit(): void {
    this.dishes=mockMeals;
  }

}
