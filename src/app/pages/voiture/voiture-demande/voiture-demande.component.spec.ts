import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureDemandeComponent } from './voiture-demande.component';

describe('VoitureDemandeComponent', () => {
  let component: VoitureDemandeComponent;
  let fixture: ComponentFixture<VoitureDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoitureDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
