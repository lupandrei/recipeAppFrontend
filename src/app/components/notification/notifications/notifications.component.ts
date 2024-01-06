import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { RecipeAddNotification } from 'src/app/entity/notification/recipe-add-notification';
import { JwtService } from 'src/app/services/config/jwt.service';
import { StompService } from 'src/app/services/config/stomp.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
  notifications:RecipeAddNotification[]=[];
  constructor(private stompService: StompService,private jwtService:JwtService){}
  
  ngOnInit(): void {
    let userEmail = this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email');
    const storedNotifications = localStorage.getItem(`notifications_${userEmail}`);
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }
    const notStoredNotifications =this.stompService.getStoredNotifications(userEmail);
    if (notStoredNotifications && notStoredNotifications.length > 0) {
      this.notifications = this.notifications.concat(notStoredNotifications);
      this.stompService.clearStoredNotifications(userEmail);
      this.stompService.resetNotificationsCount(userEmail);
      localStorage.setItem(`notifications_${userEmail}`,JSON.stringify(this.notifications))
    }
    
    this.stompService.subscribe(`/topic/recipes/${userEmail}`, (message: any) => {
      this.notifications.push(message)
      localStorage.setItem(`notifications_${userEmail}`,JSON.stringify(this.notifications))
    });
  }

}
