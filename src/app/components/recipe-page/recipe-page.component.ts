import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from 'src/app/entity/recipe/recipe-dto';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/services/config/jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsWrapperComponent } from '../reviews/reviews-wrapper/reviews-wrapper.component';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {
  recipe!: RecipeDto;
  displayData!: RecipeDisplayDto;
  selected: string = 'ingredients';
  isCurrentUser!: boolean;
  constructor(private jwtService: JwtService, private recipeService: RecipeService, private route: ActivatedRoute,private dialog: MatDialog) { }
  ngOnInit(): void {

    this.route.queryParams.subscribe(() => {
      this.recipeService.getRecipeById(window.history.state.id)
        .subscribe({
          next: (data: RecipeDto) => {
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

}
