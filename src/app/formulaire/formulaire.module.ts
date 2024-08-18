import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireNouveauPatientComponent } from './formulaire-nouveau-patient/formulaire-nouveau-patient.component';
import { FormsModule } from '@angular/forms';
import { ListePatientComponent } from './liste-patient/liste-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FormulaireNouveauPatientComponent,
    ListePatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormulaireModule { }
