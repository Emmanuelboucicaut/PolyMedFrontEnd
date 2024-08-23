import { Component, OnInit, Inject } from '@angular/core';
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
export class LoginComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({});
  LabelErrorMessage : string = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(AppServices) private appServices: AppServices) {

   }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['emmanuelboucicaut@gmail.com', [Validators.required, Validators.email]],
      password: ['hA7ht@NwG8EZQfn', [Validators.required, Validators.minLength(6)]]
    })
  }

  async onSubmit() {
    try{

      if (this.LoginForm.valid) {
        const { email, password } = this.LoginForm.value;
        const response = await this.authService.LoginUser(email, password);

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

  // getCryptedPassword(password : string ) : string {
  //   const salt = bcrypt.genSaltSync(10);
  //   return bcrypt.hashSync(password, salt);
  // }
}
