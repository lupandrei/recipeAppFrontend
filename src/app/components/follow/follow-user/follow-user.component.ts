import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserRecipeDisplayInformationDto } from 'src/app/entity/user/user-recipe-display-information-dto';
import { FollowingService } from 'src/app/services/following.service';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss']
})
export class FollowUserComponent {
  @Input()
  user!:UserRecipeDisplayInformationDto;

  @Input()
  isCurrentUser!:boolean;

  constructor(private router:Router,private followingService:FollowingService){}
  openProfile(email:string){
    const navigationExtras: NavigationExtras = {
      state: {
        email: email
      }
    };
    this.router.navigate([`/profile`],navigationExtras);
  }

  followOperation(operation:string,event:any){
    event.stopPropagation()
    if(operation==='unfollow'){
        this.followingService.unfollowUser(this.user.email).subscribe({
          next:()=>this.user.isFollowing=false
        })
    }
    else{
        this.followingService.followUser(this.user.email).subscribe({
          next :(data)=>this.user.isFollowing=true
        }
          

        );
    }
  }
}
