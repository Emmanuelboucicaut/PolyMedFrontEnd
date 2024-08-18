import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireModule } from './formulaire/formulaire.module';
import { HttpClientModule } from '@angular/common/http';
import { PagePrincipaleComponent } from './pagePrincipale/page-principale/page-principale.component';
import { SidebarComponent } from './pagePrincipale/sidebar/sidebar.component';
import { HeaderComponent } from './pagePrincipale/header/header.component';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './utilisateur/login/login.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    PagePrincipaleComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormulaireModule,
    HttpClientModule,
    UtilisateurModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
       positionClass: 'toast-top-right',
       preventDuplicates: true,
      }
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
