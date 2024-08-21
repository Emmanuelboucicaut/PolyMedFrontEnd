import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private tokenKey: string = 'access_token';

  constructor(public jwtHelper: JwtHelperService) {}

  // Store the token in localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve the token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check if the token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  // Remove the token
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
