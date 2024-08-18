import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServices } from '../appservices.service';
// import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(AppServices) private appServices: AppServices) {

   }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['emmanuel@gmail.com', [Validators.required, Validators.email]],
      password: ['masterkey', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    try{

      if (this.LoginForm.valid) {
        const { email, password } = this.LoginForm.value;
        this.authService.LoginUser(email, password);
         this.router.navigate(['/formulaire']);
      } else {
        console.log('Invalid form');
      }

      this.LoginForm.reset();
    }
    catch (error) {
      console.error('Login failed', error);
    }
  }

  getLabel(keyResource : string) : string {
    return this.appServices.getLabel(keyResource);
  }

  getCryptedPassword(password : string ) : string {
    // const salt = bcrypt.genSaltSync(10);
    return "bcrypt.hashSync(password, salt)";
  }
}
