import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormulaireModule } from '../formulaire/formulaire.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    PagePrincipaleComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormulaireModule

  ]
})
export class PagePrincipaleModule { }
