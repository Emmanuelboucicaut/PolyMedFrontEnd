import { Component, OnInit, Inject  } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TranslationService } from './../../services/translation.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Importer le service Toastr
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-formulaire-nouveau-patient',
  templateUrl: './formulaire-nouveau-patient.component.html',
  styleUrls: ['./formulaire-nouveau-patient.component.css']
})
export class FormulaireNouveauPatientComponent implements OnInit {
  PatientForm : FormGroup = new FormGroup({});


  constructor(
    private supabase: SupabaseService,
    private fb: FormBuilder,
    @Inject(TranslationService) private translationService: TranslationService,
    private toastr: ToastrService ) {}

    ngOnInit() : void {
      this.PatientForm = this.fb.group({
          numeroDossier: ['', Validators.nullValidator],
          nom: ['', [Validators.required, Validators.minLength(3)]],
          prenom: ['', [Validators.required, Validators.minLength(3)]],
          addresse: ['', [Validators.required, Validators.minLength(6)]],
          dateNaissance: ['', Validators.required],
          sexe: ['', Validators.required],
          telephone: ['', [Validators.required, this.phoneNumberValidator]],
          personneResponsable: ['', [Validators.required, Validators.minLength(3)]],
          lienParente: ['', Validators.required],
          telephoneResponsable: ['', [Validators.required, this.phoneNumberValidator]],
          etatCivil: ['', Validators.required],
          symptomes: ['', [Validators.required, Validators.minLength(12)]],
          diagnostics: ['', [Validators.required, Validators.minLength(12)]],
      });
      this.translationService.loadTranslations('cr').subscribe(() => {});
    }

  getLabel(key: string): string {
    return this.translationService.translate(key);
  }

  generateNumeroDossier() {
    // Par exemple, vous pouvez utiliser un timestamp pour garantir l'unicité
    const timestamp = new Date().getTime();
    return `DOS-${timestamp}`;
  }

  phoneNumberValidator(control: AbstractControl) : ValidationErrors | null {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(control.value) ? null : { invalidPhoneNumber: true };

  }

  // Fonction pour soumettre les données du formulaire
  async onSubmit() {
    try{
      //this.PatientForm.numeroDossier = this.generateNumeroDossier();
      this.PatientForm.get('numeroDossier')?.setValue(this.generateNumeroDossier());

      console.log(this.PatientForm.value);
      const response = await this.submitForm(this.PatientForm.value);
      if(response.statusCode === 200){
        //this.toastr.success('Utilisateur ajouté avec succès!', 'Succès');
        this.showSuccessAlert(response.statusCode, response.message);
        this.PatientForm.reset();
      }
      else {
        this.showErrorAlert(response.statusCode, response.message);
      }
    } catch(error) {
      console.error('Error submitting form:', error);

    }
  }

  async submitForm(data: any): Promise<any> {
    const { error } = await this.supabase.getSupabase().from('Patient').insert([data]);
    if (error) {
      return { message : error,statusCode : 400}
    }
    return { message: 'Form submitted successfully',statusCode: 200 };
  }


  showSuccessAlert(statusCode: string, message: string) {
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
      icon: "success",
      title: `(${statusCode}) - ${message}`
    });
  }

  showErrorAlert(statusCode: string, message: string) {
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
      icon: "error",
      title: `(${statusCode}) - ${message}`
    });
  }


}
