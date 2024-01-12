import { Component, Input, OnInit } from '@angular/core';
import { ReviewDto } from 'src/app/entity/review/review-dto';
import { DeleteReviewDialogComponent } from '../../delete-review-dialog/delete-review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewService } from 'src/app/services/review.service';
import { Utils } from 'src/app/config/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input()
  recipeId!:number;
  @Input()
  review!:ReviewDto;
  @Input()
  isReviewer!:boolean;
  deleted:boolean=false;
  updating:boolean=false;
  selectedStarIndex!:number|null;
  newReviewText!:string;
  constructor(private reviewService:ReviewService, private dialog:MatDialog,private snackBar:MatSnackBar){}
  ngOnInit(): void {
    this.selectedStarIndex=this.review.rating;
  }
  getStarsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }
  openDeleteReviewModal(id:number){
    const dialogRef = this.dialog.open(DeleteReviewDialogComponent, {
      width: '300px',
      data:{
        entity:'review'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.deleteReview(id).subscribe({
            next: (data)=>{
              this.deleted=true
            }
        } );
      }
    });
  }

  changeViewToupdateReview(id:number){
    this.updating=true;
    this.newReviewText=this.review.reviewText
  }
  
  updateReview(){
    if (this.newReviewText && this.selectedStarIndex !== null) {
      const newReview = {
        id:this.review.id,
        reviewText: this.newReviewText,
        rating: this.selectedStarIndex + 1,
        time: Utils.formatDate(new Date(Date.now())),
        email:''
      };
      this.reviewService.updateReview(newReview).subscribe({
        next:()=>{
          this.snackBar.open('Review submitted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.review.reviewText=this.newReviewText;
          if(this.selectedStarIndex)
            this.review.rating=this.selectedStarIndex+1;
          this.updating=false
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

  onStarClick(index: number): void {
    this.selectedStarIndex = index === this.selectedStarIndex ? null : index;
    if (this.selectedStarIndex !== null) {
      const selectedRating = this.selectedStarIndex + 1;
    }
  }
  closeUpdate(){
    this.updating=false;
  }
} 

