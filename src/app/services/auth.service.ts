import { Injectable, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Session } from '@supabase/supabase-js';
import { Utilisateur } from '../models/utilisateur';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../services/auth/jwt.service';
import * as bcrypt from 'bcryptjs';
import { UserSession } from '../models/user-session';
import { BehaviorSubject } from 'rxjs';
import { UserSessionService } from './user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private userSession : UserSession = {
    nom : "",
    langue : ""
  }

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private supaBaseService : SupabaseService,
    private http: HttpClient,
    private jwtService: JwtService,
    private userSessionService: UserSessionService
    // public jwtHelper: JwtHelperService
  )
    { }


  ngOnInit(): void {
    // S'abonner aux mises à jour de session en temps réel
    this.userSessionService.userSession$.subscribe((session) => {
      this.userSession = session;
    });
  }

  isAuthenticated() {
    return this.loggedIn.asObservable();
  }

  async LoginUser(email: string, password: string): Promise<any> {
    const { data, error } = await this.supaBaseService.getSupabase().auth.signInWithPassword({email,password});

    //1) if user not found, return an error message to user
    if (error) {
      return {statusCode : error.status, message:error.message}
    } else {
      // this.token = data.session.access_token;
      this.handleLoginResponse(data.session);
      //2) if not take the user email, search user info in the utilisateur table
    }

    await this.SetUserData(email);

    //4) return info to user page

    return {statusCode: 200, message: "User Login successfully"}

  }

  async AddNewUser(NewUser : Utilisateur): Promise<any>{
    //Create userLogin to supabase auth
    const {data, error } = await this.supaBaseService.getSupabase().auth.signUp({
      email: NewUser.email,
      password: NewUser.motDePasse
    });

    if(error) {
      return{ message: error, statusCode: 400}
    }
    else {
      await this.createUserInfo(NewUser);
    }
    // Create user info to Polymed Utilisateur table
    
    return { message: 'Form sumitted successfully', statusCode: 200};
  }

  async createUserInfo(NewUser: Utilisateur) : Promise<any>{
    const {data, error} = await this.supaBaseService.getSupabase().from('Utilisateur').insert([NewUser]);

    if(error){
      return { message: error, statusCode: 400}
    }
  }

  handleLoginResponse(response: any): void {
    if (response.access_token) {
      this.jwtService.setToken(response.access_token);
    }
  }

  logout() : void {
    this.jwtService.removeToken();
  }

  isLoggedIn(): boolean {
    this.loggedIn.next(this.jwtService.isTokenExpired());
    return !this.jwtService.isTokenExpired();
  }

  async SetUserData(email: string) {
        const { data } = await this.supaBaseService.getSupabase()
      .from('Utilisateur')
      .select('*')
      .eq('email', email)
      // .eq('password', password)
      .single();

    this.userSession =  {
      nom: data.nom,
      prenom: data.prenom,
      langue: data.languePreferee,
      email: data.email
    }

    console.log('auth.services', this.userSession);

    this.userSessionService.updateUserSession(this.userSession);
  }

}
