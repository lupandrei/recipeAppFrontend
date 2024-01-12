import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { JwtService } from './jwt.service';
import { Constants } from 'src/app/config/constants';
import { RecipeAddNotification } from 'src/app/entity/notification/recipe-add-notification';

@Injectable({
  providedIn: 'root'
})
export class StompService {

  private socket: any;
  private stompClient: any;
  private userChatData: { [email: string]: any } = {};
  private notificationsCountMap: { [email: string]: number } = {};
  private notificationsCountSubject = new BehaviorSubject<{ [email: string]: number }>({});
  private storedNotifications: { [email: string]: RecipeAddNotification[] } = {};

  constructor(private jwtService: JwtService) {

    this.socket = new SockJS(`${Constants.API_ENDPOINT}/sba-websocket`);
    this.stompClient = Stomp.over(this.socket);
    let userEmail = this.jwtService.getCookieField(Constants.AUTH_COOKIE, "email")

    const connectionStatus = localStorage.getItem(`stompConnectionStatus_${userEmail}`);
    if (connectionStatus === 'connected') {
      this.connectToChat(userEmail);
    }
  }
  connectToChat(email: string): void {
    if (!localStorage.getItem(`stompConnectionStatus_${email}`)) {
      this.stompClient = Stomp.over(new SockJS(`${Constants.API_ENDPOINT}/sba-websocket`));
    }
    this.stompClient.connect({}, (frame: any) => {
      localStorage.setItem(`stompConnectionStatus_${email}`, 'connected');
      this.stompClient.subscribe(`/topic/recipes/${email}`, (response: any) => {
        const parsedMessage = JSON.parse(response.body);
        this.incrementNotificationsCount(email);
        this.storeNotification(email, parsedMessage)
      });
    });

  }

  getChatData(email: string): any {
    return this.userChatData[email] || null;
  }

  subscribe(topic: string, callback: any) {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.subscribeToTopic(topic, callback);
      return;
    }
    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);
    });
  }

  private subscribeToTopic(topic: string, callback: (message: any) => void) {
    this.stompClient.subscribe(topic, (message: any): void => {
      const parsedMessage = JSON.parse(message.body);
      this.incrementNotificationsCount(this.jwtService.getCookieField(Constants.AUTH_COOKIE, "email"));
      callback(parsedMessage);
    });
  }
  incrementNotificationsCount(email: string): void {
    this.notificationsCountMap[email] = (this.notificationsCountMap[email] || 0) + 1;
    this.notificationsCountSubject.next({ ...this.notificationsCountMap });
  }

  resetNotificationsCount(email: string): void {
    this.notificationsCountMap[email] = 0;
    this.notificationsCountSubject.next({ ...this.notificationsCountMap });
  }

  getNotificationsCountObservable(email: string): Observable<number> {
    return this.notificationsCountSubject.asObservable().pipe(
      map((countMap) => countMap[email] || 0)
    );
  }

  private storeNotification(email: string, notification: RecipeAddNotification): void {
    this.storedNotifications[email] = this.storedNotifications[email] || [];
    this.storedNotifications[email].push(notification);
  }

  public clearStoredNotifications(email: string): void {
    this.storedNotifications[email] = [];
  }
  public getStoredNotifications(email: string): RecipeAddNotification[] {
    return this.storedNotifications[email] || [];
  }
}
