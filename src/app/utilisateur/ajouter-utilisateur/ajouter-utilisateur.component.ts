// import { Utilisateur } from './../../models/utilisateur';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServices } from '../appservices.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent implements OnInit {
  utilisateurForm: FormGroup = new FormGroup({});
  utilisateur : Utilisateur = {
    nom : "",
    prenom : "",
    email : "",
    motDePasse : "",
    role : "",
    languePreferee : ""
  };


  roles = [
    { value: 'simple', label: 'Utilisateur Simple' },
    { value: 'admin', label: 'Administrateur' }
  ];
  langues = [
    { value: 'fr', label: 'Français' },
    { value: 'cr', label: 'Créole' }
  ];

  constructor(private  fb: FormBuilder,
    @Inject(AppServices) private appServices: AppServices,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.utilisateurForm = this.fb.group({
        nom: ['', [Validators.required]],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        motDePasse: ['', [Validators.required, Validators.minLength(6)]],
        reMotDePasse: ['', [Validators.required, Validators.minLength(6)]],
        languePreferee: ['', Validators.required],
    });
  }

   async onSubmit() {
    try {
      if (this.utilisateurForm.valid) {
        const { nom, prenom, email, motDePasse, reMotDePasse, role, languePreferee } = this.utilisateurForm.value;

        if(!this.compareEntryUserPassword(motDePasse, reMotDePasse )){
          Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Password doesn\t match',
              confirmButtonText: 'OK'
          });

          return;
        }

        const cryptedPassword = await this.getCryptedPassword(motDePasse);

        this.utilisateur = {
          nom : nom,
          prenom : prenom,
          email : email,
          motDePasse : cryptedPassword,
          role : role,
          languePreferee : languePreferee
        };

        this.authService.AddNewUser(this.utilisateur)
        .then((response)=> {
          if(response.statusCode === 200 ){
                Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Utilisateur ajouté avec succès',
                confirmButtonText: 'OK'
              });
              this.utilisateurForm.reset();
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: response.message,
              confirmButtonText: 'OK'
            });
            // console.error('Échec de l’ajout de l’utilisateur', error);
            // console.error(response.message);
          }

        }).catch(error =>{
          console.error('Eched de l\'ajout de l\'utilisateur',error);
        });

      } else {
        Swal.fire({
        icon: 'warning',
        title: 'Avertissement',
        text: 'Le formulaire n’est pas valide',
        confirmButtonText: 'OK'
      });
      }
    }
    catch(error) {
      console.log('Login failed',error);
    }
  }



  getLabel(key: string): string {
    return this.appServices.getLabel(key);
  }

  getCryptedPassword(password : string ) : string {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
  }

  compareEntryUserPassword(password: string, rePassword: string) : boolean {
    return password === rePassword;
  }
}
