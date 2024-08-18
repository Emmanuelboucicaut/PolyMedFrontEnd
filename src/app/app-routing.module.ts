import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulaireNouveauPatientComponent } from './formulaire/formulaire-nouveau-patient/formulaire-nouveau-patient.component';
import { ListePatientComponent } from './formulaire/liste-patient/liste-patient.component';
import { AjouterUtilisateurComponent } from './utilisateur/ajouter-utilisateur/ajouter-utilisateur.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/formulaire', pathMatch: 'full'},
  {path: 'formulaire', component: FormulaireNouveauPatientComponent, title: 'Form Page', canActivate: [authGuard] },
  {path: 'listePatient', component: ListePatientComponent, title:'Liste Patient' , canActivate: [authGuard] },
  {path: 'ajouter', component: AjouterUtilisateurComponent, title: 'Ajouter Un utilisateur'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
