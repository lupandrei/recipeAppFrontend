import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeAddNotification } from 'src/app/entity/notification/recipe-add-notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input()
  recipeAddNotification!:RecipeAddNotification;

  constructor(private router:Router){}
  
  navigateTo(id:number){
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/recipe`],navigationExtras);
  }
}
