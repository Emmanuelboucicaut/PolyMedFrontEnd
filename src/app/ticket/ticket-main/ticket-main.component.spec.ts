import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMainComponent } from './ticket-main.component';

describe('TicketMainComponent', () => {
  let component: TicketMainComponent;
  let fixture: ComponentFixture<TicketMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketMainComponent]
    });
    fixture = TestBed.createComponent(TicketMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
