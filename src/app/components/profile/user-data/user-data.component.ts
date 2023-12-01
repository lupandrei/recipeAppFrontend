import { Component, OnInit } from '@angular/core';
import { UserFollowing } from 'src/app/entity/following/user-following';
import { mockUser } from 'src/app/mock-data/mock-user-following';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  user!: UserFollowing;
  
  ngOnInit(): void {
    this.user = mockUser;
  }
}
