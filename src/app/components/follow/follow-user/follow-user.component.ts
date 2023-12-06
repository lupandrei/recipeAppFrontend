import { Component, Input } from '@angular/core';
import { UserRecipeDisplayInformationDto } from 'src/app/entity/user/user-recipe-display-information-dto';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss']
})
export class FollowUserComponent {
  @Input()
  user!:UserRecipeDisplayInformationDto;
}
