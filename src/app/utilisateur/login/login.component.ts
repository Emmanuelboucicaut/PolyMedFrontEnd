import { Component, OnInit, Inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServices } from '../appservices.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //LoginForm: FormGroup = new FormGroup({});
  LabelErrorMessage : string = "";

  LoginForm = this.fb.group({
    email: ['emmanuelboucicaut@gmail.com',[
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]],
    password: ['hA7ht@NwG8EZQfn', [
      Validators.required,
      Validators.minLength(6)
    ]],
    remember: ['',[

    ]],
  });

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(AppServices) private appServices: AppServices) {

    }

    // ngOnInit(): void {
    // }

  async onSubmit(): Promise<any> {
    try{
      if (this.LoginForm.valid) {
        const { email, password } = this.LoginForm.value;
        const response = await this.authService.LoginUser(email || '', password || '');

        if (response.statusCode === 400) {
          this.LabelErrorMessage = response.message
        }
        else {
          this.LabelErrorMessage = "";

          await this.router.navigate(['/']).then(() => {
            window.location.reload();
            this.LoginForm.reset();
          });
        }

      } else {
        console.log('Invalid form');
      }

    }
    catch (error) {
      console.error('Login failed', error);
    }
  }

  getLabel(keyResource : string) : string {
    return this.appServices.getLabel(keyResource);
  }

  get emailGetter() {
    return this.LoginForm.get('email');
  }

  get password() {
    return this.LoginForm.get('password');
  }
}
