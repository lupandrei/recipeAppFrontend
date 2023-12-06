import { Component, Input } from '@angular/core';
import { UserRecipeDisplayInformationDto } from 'src/app/entity/user/user-recipe-display-information-dto';

@Component({
  selector: 'app-follow-user-wrapper',
  templateUrl: './follow-user-wrapper.component.html',
  styleUrls: ['./follow-user-wrapper.component.scss']
})
export class FollowUserWrapperComponent {
  @Input()
  users!:UserRecipeDisplayInformationDto[];
}
