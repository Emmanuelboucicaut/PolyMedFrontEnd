import { Component, OnInit, Inject  } from '@angular/core';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PolyMFrontEnd';
  isLoggedIn = false;

  constructor(
    @Inject(AuthService) private authService: AuthService
  ) {}

  // const authService = inject(AuthService);


  async ngOnInit(): Promise<void> {
    await this.checkLoginStatus();

  }

   async checkLoginStatus(): Promise<void> {
    this.isLoggedIn = await this.authService.isLoggedIn();
  }
}
