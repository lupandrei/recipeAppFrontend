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
  switchMap,
} from 'rxjs';
import { PaginatedDisplayRecipeResponse } from 'src/app/entity/recipe/paginated-display-recipe-response';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';

export const simpleFadeAnimation = trigger('simpleFadeAnimation', [
  state('in', style({ opacity: 0.5 })),
  transition(':enter', [style({ opacity: 0 }), animate(400)]),
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
  size:number=5;
  totalSize!:number;
  page:number=0;
  loading:boolean=false;
  disabled:boolean=false;
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
    this.toggleLoading()
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) =>
          this.recipeService.getFilteredDisplayRecipes(
            this.rating,
            this.category,
            term,
            undefined,
            this.page,
            this.size
          )
        )
      )
      .subscribe({
        next: (data: PaginatedDisplayRecipeResponse) => {
          this.totalSize=data.numberOfRecipes;
          console.log(data.recipes)
          this.dishes = data.recipes;
          this.dishesEvent.next(this.dishes);
        },
        complete:()=>this.toggleLoading()
      });
  }
  toggleLoading =() => this.loading = !this.loading;

  onScroll = () =>{
    console.log("enters")
    this.page++;
    if(this.page*this.size<this.totalSize)
      this.loadMoreRecipes();
    else
      this.disabled=true
  } 
  loadMoreRecipes(): void {
    this.toggleLoading();
    this.recipeService.getFilteredDisplayRecipes(this.rating, this.category, this.search, undefined,this.page, this.size).subscribe(
      ({ recipes }) => {
        this.dishes = this.dishes.concat(recipes); // Append new recipes to the existing list
        this.dishesEvent.next(this.dishes); // Notify subscribers of new dishes
      },
      error => {
        console.error('Error loading more recipes:', error);
      },
     () => this.toggleLoading()
    );
  }


  onAnimationDone(event: any) {
    if (event.toState === 'void' && event.phaseName === 'done') {
      this.animationDone = true;
      this.animationDoneEvent.emit(this.animationDone);
    }
  }

  onSearchChange() {
    this.disabled=false;
    this.page=0;
    this.searchSubject.next(this.search || '');
  }

  verifyCurrentPage(){
    if(this.router.url=== '/home'){
      this.router.navigate(['/search-recipes'])
    }
  }

  handleFilterOptionEvent($event: any) {
    this.page=0;
    this.disabled=false
    this.rating=$event.rating
    this.category=$event.category
    this.toggleLoading();
    this.recipeService
      .getFilteredDisplayRecipes(
        this.rating,
        this.category,
        this.search,
        undefined,
        this.page,
        this.size
      )
      .subscribe({
        next: (data: PaginatedDisplayRecipeResponse) => {
          console.log(data)
          this.totalSize=data.numberOfRecipes
          this.dishes = data.recipes;
          this.show = false;
          this.dishesEvent.emit(this.dishes);
        },
        complete:()=>this.toggleLoading()
      });
  }
}
