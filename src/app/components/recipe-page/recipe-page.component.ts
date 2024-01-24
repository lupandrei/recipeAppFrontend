import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/entity/recipe/recipe-dto';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/services/config/jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsWrapperComponent } from '../reviews/reviews-wrapper/reviews-wrapper.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
  animations: [
    // Animation trigger for the map transition
    trigger('transition', [
      state('void', style({ height: '0', opacity: '0' })),
      state('*', style({ height: '*', opacity: '1' })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class RecipePageComponent implements OnInit {
  showMap:boolean=false;
  showMacroCalculator:boolean=false;
  panelOpenState = false;
  parentMarker: google.maps.LatLngLiteral | null = null;
  recipe!: RecipeDto;
  displayData!: RecipeDisplayDto;
  selected: string = 'ingredients';
  isCurrentUser!: boolean;
  constructor(private elementRef:ElementRef, private jwtService: JwtService, private recipeService: RecipeService, private route: ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.recipeService.getRecipeById(window.history.state.id)
        .subscribe({
          next: (data: RecipeDto) => {
            console.log(data)
            this.recipe = data;
            this.displayData = data as RecipeDisplayDto;
            this.isCurrentUser = this.jwtService.isCurrentUser(this.recipe.userRecipeDisplayInformationDto.email)
          }
        })
    });
  }
  changeView(viewOption: string) {
    this.selected = viewOption
  }

  openReviewModalComponent(){
    const dialogRef = this.dialog.open(ReviewsWrapperComponent, {
      width: '95%',
      maxHeight:"700px",
      data:{
        id:this.recipe.id,
        isCurrentUser:this.isCurrentUser
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  handleMarkerChange(marker: google.maps.LatLngLiteral) {
    this.parentMarker = marker;
  }
  

}
