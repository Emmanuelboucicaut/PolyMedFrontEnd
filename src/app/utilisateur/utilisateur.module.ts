import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AjouterUtilisateurComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UtilisateurModule { }
