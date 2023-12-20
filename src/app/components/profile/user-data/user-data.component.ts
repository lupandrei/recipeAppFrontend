import { Component, Input, OnInit } from '@angular/core';
import { UserFollowingDto } from 'src/app/entity/following/user-following';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  @Input()
  email!:string;
  user!: UserFollowingDto;
  
  constructor(private userService:UserService){}
  ngOnInit(): void {
    
    this.userService.getUserFollowing(this.email).subscribe({
      next: (data:UserFollowingDto) =>{
        this.user=data
        console.log(data)
      }
    })
  }
}
