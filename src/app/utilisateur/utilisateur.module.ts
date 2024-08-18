import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';



@NgModule({
  declarations: [
    AjouterUtilisateurComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class UtilisateurModule { }
