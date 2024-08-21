import { Injectable } from '@angular/core';
import { UserSession } from '../models/user-session';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  // Utilisation de BehaviorSubject pour garder les données à jour en temps réel
  private userSessionSource = new BehaviorSubject<UserSession>({});
  userSession$ = this.userSessionSource.asObservable();

  constructor() {}

  // Méthode pour mettre à jour la session utilisateur
  updateUserSession(sessionData: UserSession): void {
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    this.userSessionSource.next(sessionData);
  }

  // Méthode pour récupérer la session utilisateur
  getUserSession(): UserSession {
    const sessionData = localStorage.getItem('userSession');
    return sessionData ? JSON.parse(sessionData) : this.userSessionSource.getValue();
  }

}
