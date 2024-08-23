import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket, Developer } from './../models/ticket'; // Assurez-vous d'importer les bons modèles
import { SupabaseService } from './supabase.service';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsSubject: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
  private developers: Developer[] = [
    { id: '1', fullName: 'Emmanuel Boucicaut' },
    { id: '2', fullName: 'Emmah Boucicaut' }
    // Ajoutez vos développeurs ici
  ];

  constructor(private supabaseService: SupabaseService){}

  async getTickets(): Promise<Ticket[]> {
    const { data, error} = await this.supabaseService.getSupabase().from('Ticket').select('*');

    console.log('data',data);

    if(error){
      throw error;
    }
    else {
      console.log(data);
      return data;
    }
  }

  async addTicket(ticket: Ticket): Promise<void> {
    try{
      console.log('NewTicket', ticket);
      const { data, error} = await this.supabaseService.getSupabase().from('Ticket').insert(ticket);
  
      if(error){
        console.error(error);
      }
      else {
        console.log(data);
      }
    }
    catch(err) {
      console.error('Unexpected error:', err);
    }
  }

  updateTicket(updatedTicket: Ticket): void {
    const currentTickets = this.ticketsSubject.value.map(ticket =>
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
    this.ticketsSubject.next(currentTickets);
  }

  getDevelopers(): Developer[] {
    return this.developers;
  }
}
