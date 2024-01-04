import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PaginatedUsersReponse } from 'src/app/entity/user/paginated-user-response';
import { UserRecipeDisplayInformationDto } from 'src/app/entity/user/user-recipe-display-information-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent {
  search:string='';
  followed:boolean=false;
  follower:boolean=false;
  showNavbar:boolean=true;
  emailUserProfile!:string;
  users!:UserRecipeDisplayInformationDto[];
   searchSubject = new Subject<string>();
  constructor(private userService:UserService,public dialogRef: MatDialogRef<SearchUsersComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any){
        this.follower=data.follower
        this.followed=data.followed
        this.showNavbar=data.showNavbar!=undefined? data.showNavbar : this.showNavbar
        this.emailUserProfile = data.emailUserProfile
    }
  ngOnInit() {
    console.log(this.followed)
    console.log(this.follower)
    if(this.follower!=undefined && this.followed!=undefined){
      this.userService.getUsersByEmail('',this.followed,this.follower,this.emailUserProfile)
      .subscribe({
        next: (data: PaginatedUsersReponse) => {
          this.users = data.users;
          console.log(this.users)
        }
      });
    }
    this.searchSubject
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap((term) => this.userService.getUsersByEmail(term,this.followed,this.follower,this.emailUserProfile))
      )
      .subscribe({
        next: (data: PaginatedUsersReponse) => {
          this.users = data.users;
          console.log(this.users)
        }
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.search);
  }
}
