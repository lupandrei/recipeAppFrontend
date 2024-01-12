import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { Utils } from 'src/app/config/utils';
import { RecipeDisplayDto } from 'src/app/entity/recipe/recipe-display-dto';
import { JwtService } from 'src/app/services/config/jwt.service';
import { SavedRecipeService } from 'src/app/services/saved-recipe.service';

@Component({
  selector: 'app-full-image-display',
  templateUrl: './full-image-display.component.html',
  styleUrls: ['./full-image-display.component.scss']
})
export class FullImageDisplayComponent {
  @Input()
  dish!:RecipeDisplayDto;

  @Input()
  showTitle!:boolean;

  constructor(private router:Router,private savedRecipeService:SavedRecipeService,private jwtService:JwtService){}

  redirect(id:number){
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/recipe`],navigationExtras);
  }
  saveOperation(event: any): void {
    event.stopPropagation();

    if (this.dish.isSaved) {
      this.removeSavedRecipe();
    } else {
      this.saveNewRecipe();
    }
  }

  private removeSavedRecipe(): void {
    this.savedRecipeService.removeSavedRecipe(this.dish.id).subscribe({
      next: (data) => {
        this.dish.isSaved = false;
      }
    });
  }

  private saveNewRecipe(): void {
    const email = this.getEmailFromCookie();
    const saveDto = Utils.toSaveDto(this.dish.id, email);

    this.savedRecipeService.saveRecipe(saveDto).subscribe({
      next: (data) => {
        this.dish.isSaved = true;
      }
    });
  }

  private getEmailFromCookie(): string {
    return this.jwtService.getCookieField(Constants.AUTH_COOKIE, 'email');
  }
}
