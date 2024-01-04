import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utils } from 'src/app/config/utils';
import { ReviewDto } from 'src/app/entity/review/review-dto';
import { JwtService } from 'src/app/services/config/jwt.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-reviews-wrapper',
  templateUrl: './reviews-wrapper.component.html',
  styleUrls: ['./reviews-wrapper.component.scss']
})
export class ReviewsWrapperComponent implements OnInit {
  
  recipeId!:number;
  isCurrentUser!:boolean;
  reviews!: ReviewDto[];
  selectedStarIndex:number|null=null;
  newReviewText: string = '';

  constructor(private jwtService:JwtService ,private snackBar: MatSnackBar,private recipeService:RecipeService,
    public dialogRef: MatDialogRef<ReviewsWrapperComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any){
      this.recipeId=data.id
      this.isCurrentUser=data.isCurrentUser
    }
  ngOnInit(): void {
    this.recipeService.getRecipeReviews(this.recipeId).subscribe({
      next: (data)=> {
        this.reviews=data.reviews
      }
    }
    )
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
  getStarsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }

  onStarClick(index: number): void {
    this.selectedStarIndex = index === this.selectedStarIndex ? null : index;
    if (this.selectedStarIndex !== null) {
      const selectedRating = this.selectedStarIndex + 1;
    }
  }
   onSubmitReview(): void {
    if (this.newReviewText && this.selectedStarIndex !== null) {
      const newReview = {
        id:this.recipeId,
        reviewText: this.newReviewText,
        rating: this.selectedStarIndex + 1,
        time: Utils.formatDate(new Date(Date.now())),
        email:''
      };
      this.recipeService.addReview(newReview).subscribe({
        next:()=>{
          this.snackBar.open('Review submitted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dialogRef.close();
        }
      })
      
    }
    else{
      this.snackBar.open('Invalid data.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'snackbar-error',
      });
    }
  }
  isReviewer(email:string):boolean{
    return this.jwtService.isCurrentUser(email);
  }
}
