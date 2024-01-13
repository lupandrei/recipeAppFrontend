import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFollowingDto } from 'src/app/entity/following/user-following';
import { UserService } from 'src/app/services/user.service';
import { SearchUsersComponent } from '../../search-users/search-users.component';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  @Input()
  email!: string;
  user!: UserFollowingDto;

  constructor(private cdr: ChangeDetectorRef,private router:Router, private userService: UserService, private dialog: MatDialog) { }
  ngOnInit(): void {

    this.userService.getUserFollowing(this.email).subscribe({
      next: (data: UserFollowingDto) => {
        this.user = data
      }
    })
  }
  openModal(type: string) {
    const dialogRef = this.dialog.open(SearchUsersComponent, {
      width: '95%',
      maxHeight: "700px",
      minHeight:"400px",
      data: {
        follower: type == 'follower',
        followed: type == 'followed',
        showNavbar: false,
        emailUserProfile:this.email,
        fromModal:true
      }
    });
    dialogRef.afterClosed().subscribe(email => {
      if (email) {
        this.openProfile(email);
      }
    });
  }
  openProfile(email:string){
    console.log(email)
    const navigationExtras: NavigationExtras = {
      state: {
        email: email
      }
    };
    console.log(navigationExtras)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([`/profile`],navigationExtras))   
    
    
  }

}
