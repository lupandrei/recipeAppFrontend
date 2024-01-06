import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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

  constructor(private router:Router){}

  updateRecipe(id:number){
    console.log('update')
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/add`],navigationExtras);
  }
  deleteRecipe(id:number){
    console.log('delete')
  }
}
