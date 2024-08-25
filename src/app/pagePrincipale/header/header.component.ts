import { Utilisateur } from 'src/app/models/utilisateur';
import { AppServices } from './../../utilisateur/appservices.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserSession } from 'src/app/models/user-session';
import { UserSessionService } from 'src/app/services/user-session.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: UserSession = {}

  @Input() sidenav!: MatSidenav;

  constructor(
    private userSession: UserSessionService,
    private authService: AuthService
  ){}

  async ngOnInit(): Promise<void> {
    this.userInfo = await this.getUserInfo();
  }

  async getUserInfo() : Promise<UserSession>{
    return await this.userSession.getUserSession();
  }

  toggleSidebar() {
    this.sidenav.toggle();
  }

  async onLogout() : Promise<void> {
    this.authService.logout();
    window.location.reload();
  }
}
