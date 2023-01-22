import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureInscriptionComponent } from './voiture-inscription.component';

describe('VoitureInscriptionComponent', () => {
  let component: VoitureInscriptionComponent;
  let fixture: ComponentFixture<VoitureInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoitureInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
