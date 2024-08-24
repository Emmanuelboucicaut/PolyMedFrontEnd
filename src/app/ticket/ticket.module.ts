import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket/ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketMainComponent } from './ticket-main/ticket-main.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    TicketComponent,
    TicketListComponent,
    TicketMainComponent
  ],
  imports: [
    CommonModule,
     ReactiveFormsModule,
     MatTabsModule,
     MatTableModule,
     MatInputModule,
     MatFormFieldModule,
     MatCardModule
     
  ]
})
export class TicketModule { }
