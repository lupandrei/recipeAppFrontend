import { Component } from '@angular/core';
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
  users!:UserRecipeDisplayInformationDto[];
   searchSubject = new Subject<string>();
  constructor(private userService:UserService){}
  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap((term) => this.userService.getUsersByEmail(term))
      )
      .subscribe({
        next: (data: PaginatedUsersReponse) => {
          this.users = data.users;
        }
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.search);
  }
}
