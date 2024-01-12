import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private emailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setEmail(email: string|null): void {
    this.emailSubject.next(email);
  }

  getEmailObservable(): Observable<string | null> {
    return this.emailSubject.asObservable();
  }
}
