import { Component,  OnInit } from '@angular/core';
import { DishMainView } from 'src/app/entity/dish-main-view';
import { mockMeals } from 'src/app/mock-data/mock-meals';
import * as $ from 'jquery';
@Component({
  selector: 'app-dishes-wrapper',
  templateUrl: './dishes-wrapper.component.html',
  styleUrls: ['./dishes-wrapper.component.scss'],
})
export class DishesWrapperComponent implements OnInit {
  dishes!: DishMainView[];
  scrollPosition:number=0;
  carouselWidth:any;
  cardWidth:any;

  ngOnInit(): void {
    this.dishes = mockMeals;
    console.log(this.dishes);
  }

  ngAfterViewInit() {
    this.carouselWidth = $('.carousel-inner')[0].scrollWidth;
    this.cardWidth =$('.carousel-item').width();
  }

  navigate(pos:string){
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
