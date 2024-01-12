import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { PaginatedUsersReponse } from 'src/app/entity/user/paginated-user-response';
import { UserRecipeDisplayInformationDto } from 'src/app/entity/user/user-recipe-display-information-dto';
import { UserService } from 'src/app/services/user.service';
import { NavigationService } from 'src/app/services/navigation.service';
@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent {
  page:number=0;
  size:number=10;
  totalSize!:number;
  loading:boolean=false;
  search:string='';
  followed:boolean=false;
  follower:boolean=false;
  showNavbar:boolean=true;
  disabled:boolean=false;
  emailUserProfile!:string;
  users!:UserRecipeDisplayInformationDto[];
   searchSubject = new Subject<string>();
  constructor(private navigationService:NavigationService,  private userService:UserService,public dialogRef: MatDialogRef<SearchUsersComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any){
        this.follower=data.follower
        this.followed=data.followed
        this.showNavbar=data.showNavbar!=undefined? data.showNavbar : this.showNavbar
        this.emailUserProfile = data.emailUserProfile
    }
  ngOnInit() {
    if(this.follower!=undefined && this.followed!=undefined){
      this.userService.getUsersByEmail('',this.followed,this.follower,this.emailUserProfile,this.page,this.size)
      .subscribe({
        next: (data: PaginatedUsersReponse) => {
          this.totalSize=data.numberOfUsers;
          this.users = data.users;
        }
      });
      this.navigationService
      .getEmailObservable()
      .pipe(takeUntil(this.dialogRef.afterClosed()))
      .subscribe((email: string | null) => {
        if (email) {
          this.dialogRef.close(email);
          this.navigationService.setEmail(null);
        }
      });
    }
    this.searchSubject
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap((term) => this.userService.getUsersByEmail(term,this.followed,
          this.follower,this.emailUserProfile,this.page,this.size))
      )
      .subscribe({
        next: (data: PaginatedUsersReponse) => {
          this.totalSize=data.numberOfUsers;
          this.users = data.users;
        },
        complete:()=>this.toggleLoading()
      });
  }

  onSearchChange() {
    this.page=0;
    this.disabled=false;
    this.searchSubject.next(this.search);
  }
  toggleLoading =() => this.loading = !this.loading;
  onScroll = () =>{
    this.page++;
    if(this.page*this.size<this.totalSize)
      this.loadMoreUsers();
    else
      this.disabled=true;
  } 
  loadMoreUsers(): void {
    this.toggleLoading();
    this.userService.getUsersByEmail(this.search,this.followed,this.follower,
      this.emailUserProfile,this.page,this.size).subscribe(
      ({ users }) => {
        this.users = this.users.concat(users); // Append new recipes to the existing list
      },
      error => {
        console.error('Error loading more recipes:', error);
      },
     () => this.toggleLoading()
    );
  }
}
