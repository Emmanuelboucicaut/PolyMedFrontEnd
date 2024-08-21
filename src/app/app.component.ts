import { Component, OnInit, Inject  } from '@angular/core';
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PolyMFrontEnd';
  isLoggedIn = false;

  constructor(
    @Inject(AuthService) private authService: AuthService,
    private router: Router,
  ) {
     this.checkLoginStatus();
  }

  ngOnInit(): void{
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
