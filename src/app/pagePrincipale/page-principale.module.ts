import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormulaireModule } from '../formulaire/formulaire.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './../app-routing.module';
import { TicketModule } from '../ticket/ticket.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    PagePrincipaleComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormulaireModule,
    AppRoutingModule,
    TicketModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule

    

  ],
  exports: [PagePrincipaleComponent]
})
export class PagePrincipaleModule { }
