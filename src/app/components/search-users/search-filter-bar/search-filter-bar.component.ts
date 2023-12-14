import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';

export const simpleFadeAnimation = trigger('simpleFadeAnimation', [
  // the "in" style determines the "resting" state of the element when it is visible.
  state('in', style({ opacity: 0.5 })),
  // fade in when created. this could also be written as transition('void => *')
  transition(':enter', [style({ opacity: 0 }), animate(400)]),
  // fade out when destroyed. this could also be written as transition('void => *')
  transition(':leave', animate(400, style({ opacity: 0 }))),
]);
@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.scss'],
  animations: [simpleFadeAnimation],
})
export class SearchFilterBarComponent implements OnInit {
  @Output() showEvent = new EventEmitter<boolean>(false);
  @Output() animationDoneEvent = new EventEmitter<boolean>(true);
  @Output() dishesEvent = new EventEmitter<RecipeDisplayDto[]>();
  dishes!: RecipeDisplayDto[];
  fadeInUp: any;
  href: string = '';
  search!: string;
  rating!: number;
  category!: string;
  searchSubject = new Subject<string>();
  show: boolean = false;
  animationDone: boolean = true;

  constructor(private recipeService: RecipeService,private router:Router) {}

  filterOptions() {
    this.verifyCurrentPage()
    if (!this.show) {
      this.animationDone = false;
      this.animationDoneEvent.emit(this.animationDone);
    }
    this.show = !this.show;
    this.showEvent.emit(this.show);
  }

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) =>
          this.recipeService.getFilteredDisplayRecipes(
            this.rating,
            this.category,
            term
          )
        )
      )
      .subscribe({
        next: (data: PaginatedDisplayRecipeResponse) => {
          this.dishes = data.recipes;
          this.dishesEvent.next(this.dishes);
        },
      });
  }

  onAnimationDone(event: any) {
    if (event.toState === 'void' && event.phaseName === 'done') {
      this.animationDone = true;
      this.animationDoneEvent.emit(this.animationDone);
    }
  }

  onSearchChange() {
    this.searchSubject.next(this.search);
  }

  verifyCurrentPage(){
    if(this.router.url=== '/home'){
      this.router.navigate(['/search-recipes'])
    }
  }

  handleFilterOptionEvent($event: any) {
    this.rating=$event.rating
    this.category=$event.category
    this.recipeService
      .getFilteredDisplayRecipes(
        this.rating,
        this.category,
        this.search
      )
      .subscribe({
        next: (data: PaginatedDisplayRecipeResponse) => {
          console.log(data)
          this.dishes = data.recipes;
          this.show = false;
          this.dishesEvent.emit(this.dishes);
        },
      });
  }
}
