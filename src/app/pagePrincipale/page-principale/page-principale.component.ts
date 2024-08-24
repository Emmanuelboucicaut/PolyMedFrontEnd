import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.css'],
   providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-CA' }, 
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePrincipaleComponent {
  sidenav!: MatSidenav;


  handleSidenavReady(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }  
}
