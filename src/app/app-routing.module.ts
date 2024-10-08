import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulaireNouveauPatientComponent } from './formulaire/formulaire-nouveau-patient/formulaire-nouveau-patient.component';
import { ListePatientComponent } from './formulaire/liste-patient/liste-patient.component';
import { AjouterUtilisateurComponent } from './utilisateur/ajouter-utilisateur/ajouter-utilisateur.component';
import { authGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './utilisateur/login/login.component';
import { PagePrincipaleComponent } from './pagePrincipale/page-principale/page-principale.component';
import { TicketComponent } from './ticket/ticket/ticket.component';
import { TicketMainComponent } from './ticket/ticket-main/ticket-main.component';

const routes: Routes = [
  { path: 'formulaire', component: FormulaireNouveauPatientComponent, title: 'Form Page', canActivate: [authGuard] },
  { path: 'listePatient', component: ListePatientComponent, title:'Liste Patient' , canActivate: [authGuard] },
  { path: 'ajouter', component: AjouterUtilisateurComponent, title: 'Ajouter Un utilisateur'},
  { path: 'manageTicket', component: TicketMainComponent, title: 'Gestion des billets', canActivate: [authGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
