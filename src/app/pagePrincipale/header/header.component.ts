import { Utilisateur } from 'src/app/models/utilisateur';
import { AppServices } from './../../utilisateur/appservices.service';
import { Component, OnInit } from '@angular/core';
import { UserSession } from 'src/app/models/user-session';
import { UserSessionService } from 'src/app/services/user-session.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: UserSession = {}

  constructor(
    private userSession: UserSessionService
  ){}

  async ngOnInit(): Promise<void> {
    this.userInfo = await this.getUserInfo();

    console.log('header',this.userInfo);
  }

  async getUserInfo() : Promise<UserSession>{
    return await this.userSession.getUserSession();
  }
}
