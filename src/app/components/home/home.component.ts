import { Component } from '@angular/core';
import { trigger, transition, style, animate,state } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0%)' })), 
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  show:boolean=false;
  animationDone:boolean = true;
  filterOptions(){
   if(!this.show)
    this.animationDone=false;
   this.show=!this.show; 
  } 
  onAnimationDone(event: any) {
    if (event.toState === 'void' && event.phaseName === 'done') {
      this.animationDone = true
    }
  }
}
