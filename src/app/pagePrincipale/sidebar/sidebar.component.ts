import { Component, Input, AfterViewInit, ViewChild, Output, EventEmitter, OnInit  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  // sidebarName: string = 'MainSidebar';

  // @Output() sidebarNameChange: EventEmitter<string> = new EventEmitter<string>()

  // ngOnInit() {
  //   // Émettre le nom de la sidebar au parent lors de l'initialisation
  //   this.sidebarNameChange.emit(this.sidebarName);
  // }
}
