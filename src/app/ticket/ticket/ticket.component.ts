import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';
import { v4 as uuidv4 } from 'uuid';
import { Developer, Ticket } from './../../models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  ticketForm: FormGroup = new FormGroup({});
  developers: Developer[] = [];

  constructor(private fb: FormBuilder, private ticketService: TicketService){}

  ngOnInit() {
    this.developers = this.ticketService.getDevelopers();

    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['bug', Validators.required],
      priority: ['moyenne', Validators.required],
      status: ['nouveau', Validators.required],
      assignee: ['', Validators.required]
    });
  }
    async onSubmit(): Promise<void> {
      console.log('Start');

      if (this.ticketForm.value) {
        const newTicket: Ticket = {
          ...this.ticketForm.value,
          id: uuidv4(),
          createdDate: new Date(),
          updatedDate: new Date()
        };


        await this.ticketService.addTicket(newTicket);
        this.ticketForm.reset();
      }
    }
    // this.ticketservice.getTickets().subscribe(developers => {
    //   this.developers = developers;
    // });
}
