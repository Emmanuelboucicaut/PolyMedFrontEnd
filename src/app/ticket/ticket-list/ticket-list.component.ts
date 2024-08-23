import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Developer, Ticket } from './../../models/ticket';
import { TicketService } from './../../services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  developers: Developer[] = [];
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();

  displayedColumns: string[] = ['title', 'description', 'type', 'priority', 'status', 'assignee', 'actions'];
  

  constructor(private ticketService: TicketService) {}

  async ngOnInit(): Promise<void> {
    this.tickets = await this.ticketService.getTickets();
    this.developers = this.ticketService.getDevelopers();

    this.dataSource = new MatTableDataSource(this.tickets);
  }

  getDeveloperName(devId: string): string {
    const developer = this.developers.find(dev => dev.id === devId);
    return developer ? developer.fullName : 'Inconnu';
  }

  editTicket(ticket: Ticket): void {
    // Implémentez la logique pour éditer un ticket existant
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
