import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireModule } from './formulaire/formulaire.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
// import { PagePrincipaleComponent } from './pagePrincipale/page-principale/page-principale.component';
import { JwtModule } from '@auth0/angular-jwt';
// import { SidebarComponent } from './pagePrincipale/sidebar/sidebar.component';
// import { HeaderComponent } from './pagePrincipale/header/header.component';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './utilisateur/login/login.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { JwtService } from './services/auth/jwt.service';
import { PagePrincipaleModule } from './pagePrincipale/page-principale.module';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    //PagePrincipaleComponent,
    //SidebarComponent,
    // HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormulaireModule,
    HttpClientModule,
    PagePrincipaleModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['https://wgtkqsyebtdvcbsoplrl.supabase.co'], // Add your API domain
        disallowedRoutes: ['https://wgtkqsyebtdvcbsoplrl.supabase.co'], // Routes that should bypass the JWT
      },
    }),
    UtilisateurModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
       positionClass: 'toast-top-right',
       preventDuplicates: true,
      }
    ),


  ],
  providers: [
    JwtService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
