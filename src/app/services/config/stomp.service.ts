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
    
    this.socket = new SockJS("http://localhost:8080/sba-websocket");
    this.stompClient = Stomp.over(this.socket);
    let userEmail = this.jwtService.getCookieField(Constants.AUTH_COOKIE, "email")
    
    const connectionStatus = localStorage.getItem(`stompConnectionStatus_${userEmail}`);
    if (connectionStatus === 'connected') {
      this.connectToChat(userEmail);
    }
  }
  connectToChat(email: string): void {
    console.log('connecting..');
  
    if (!localStorage.getItem(`stompConnectionStatus_${email}`)) {
      this.stompClient = Stomp.over(new SockJS("http://localhost:8080/sba-websocket"));
    }
    else {
      console.log('Already connected, no need to reconnect.');
    }
      this.stompClient.connect({}, (frame: any) => {
        console.log(`connected to ${frame}`);
        
        // Subscribe to the user-specific topic
        localStorage.setItem(`stompConnectionStatus_${email}`, 'connected');
        this.stompClient.subscribe(`/topic/recipes/${email}`, (response: any) => {
          const parsedMessage = JSON.parse(response.body);
          console.log('Received raw message:', parsedMessage);
          this.incrementNotificationsCount(email);
          this.storeNotification(email,parsedMessage)
        });
      });
    
  }
  // connectToChat(email: string): void {
  //   console.log('connecting..');

  //   this.stompClient = Stomp.over(new SockJS("http://localhost:8080/sba-websocket"));
  //   this.stompClient.connect({}, (frame: any) => {
  //     console.log(`connected to ${frame}`);
      
  //     // Subscribe to the user-specific topic
  //     localStorage.setItem(`stompConnectionStatus_${email}`, 'connected');
  //     this.stompClient.subscribe(`/topic/recipes/${email}`, (response: any) => {
  //       const parsedMessage = JSON.parse(response.body);
  //       console.log('Received raw message:', parsedMessage);
  //       this.incrementNotificationsCount(email);
  //     });
  //   });
  // }

  getChatData(email: string): any {
    return this.userChatData[email] || null; // Return user-specific data or null if not available
  }

  subscribe(topic: string, callback: any) {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.subscribeToTopic(topic, callback);
      return;
    }
    this.stompClient.connect({}, (): any => {
      console.log('WebSocket connection established');
      this.subscribeToTopic(topic, callback);
    });
  }

  private subscribeToTopic(topic: string, callback: (message: any) => void) {
    console.log('enters');
    this.stompClient.subscribe(topic, (message: any): void => {
      console.log('Received raw message:', message);
      const parsedMessage = JSON.parse(message.body);
      console.log('Parsed message:', parsedMessage);
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
