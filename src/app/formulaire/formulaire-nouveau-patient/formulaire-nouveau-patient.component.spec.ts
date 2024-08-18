import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireNouveauPatientComponent } from './formulaire-nouveau-patient.component';


describe('FormulaireNouveauPatientComponent', () => {
  let component: FormulaireNouveauPatientComponent;
  let fixture: ComponentFixture<FormulaireNouveauPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireNouveauPatientComponent]
    });
    fixture = TestBed.createComponent(FormulaireNouveauPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
