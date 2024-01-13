import { Component, Input } from '@angular/core';
import { UserRecipeDisplayInformationDto } from 'src/app/entity/user/user-recipe-display-information-dto';
import { JwtService } from 'src/app/services/config/jwt.service';

@Component({
  selector: 'app-follow-user-wrapper',
  templateUrl: './follow-user-wrapper.component.html',
  styleUrls: ['./follow-user-wrapper.component.scss']
})
export class FollowUserWrapperComponent {
  @Input()
  users!:UserRecipeDisplayInformationDto[];

  @Input()
  fromModal!:boolean;

  constructor(private jwtService: JwtService){}
  checkCurrentUser(user: UserRecipeDisplayInformationDto){
    return this.jwtService.isCurrentUser(user.email)

  }
}
