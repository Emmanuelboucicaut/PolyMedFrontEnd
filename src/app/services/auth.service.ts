import { Injectable } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Session } from '@supabase/supabase-js';
import { Utilisateur } from '../models/utilisateur';
import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private secretKey = "PolySecret-";

  constructor(private supaBaseService : SupabaseService,) { }

  async LoginUser(email: string, password: string): Promise<any> {
    const { data, error } = await this.supaBaseService.getSupabase()
      .from('Utilisateur')
      .select('*')
      .eq('email', email)
      // .eq('password', password)
      .single();


    if (error || !data) {
      return { data: {error : error,message : "Invalid user"}, statusCode: 400};
    }

    const isValidPassword = await bcrypt.compare(password, data.motDePasse);

      if(!isValidPassword){
        return {
          data: {statusCode : 406, message: "Mot de passe Incorrect" }
        }
      }

      return {
        data: {
          statusCode : 200,
          user:  {
            nom: data.nom
          },
          // token : this.generateToken({id: data.id, nom: data.nom, prenom: data.prenom})
        }
      }
  }

  async AddNewUser(NewUser : Utilisateur): Promise<any>{
    const {error} = await this.supaBaseService.getSupabase().from('Utilisateur').insert([NewUser]);

    console.log('AddUser', error);

    if(error){
      return { message: error, statusCode: 400}
    }
    return { message: 'Form sumitted successfully', statusCode: 200};
  }

  async logout() : Promise<void> {
    const { error } = await this.supaBaseService.getSupabase().auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const {data, error} = await this.supaBaseService.getSupabase().auth.getSession()

    console.log('check isLogging',data,error);
    if(error || data.session){
      return false;
    }

    return false;
  }

  // generateToken(user: { id: string; nom: string; prenom: string }): string {
  //   const payload = {
  //     id: user.id,
  //     nom: user.nom,
  //     prenom: user.prenom,
  //   };

  //   // Générer un token avec une expiration de 1 heure
  //   const token = jwt.sign(payload, this.secretKey, { expiresIn: '1h' });

  //   return "null";
  // }

  // verifyToken(token: string): any {
  //   try {
  //     const decoded = jwt.verify(token, this.secretKey);
  //     return decoded;
  //   } catch (error) {
  //     return null; // Token invalide ou expiré
  //   }
  // }

  // async getSession(): Promise<Session | null> {
  //   const { data, error } = await this.supaBaseService.getSupabase().auth.getSession();

  //   if (error || !data.session) {
  //     return null;
  //   }

  //   return data.session;
  // }
}
