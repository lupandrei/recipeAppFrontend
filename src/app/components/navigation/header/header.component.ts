import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DeleteReviewDialogComponent } from '../../delete-review-dialog/delete-review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  title!:string;
  @Input()
  canNavigate!:boolean;
  @Input()
  isCurrentUser!:boolean;
  @Input()
  id!:number;

  constructor(private router:Router,private dialog:MatDialog,private recipeService:RecipeService){}

  updateRecipe(id:number){
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/add`],navigationExtras);
  }
  deleteRecipe(id:number){
    const dialogRef = this.dialog.open(DeleteReviewDialogComponent, {
      width: '300px',
      data:{
        entity:'recipe'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.deleteRecipe(id).subscribe({
            next: (data)=>{
              this.router.navigate(['/home'])
            }
        } );
      }
    });

  }
}
