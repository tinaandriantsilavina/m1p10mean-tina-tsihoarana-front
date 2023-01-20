import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureListeComponent } from './voiture-liste.component';

describe('VoitureListeComponent', () => {
  let component: VoitureListeComponent;
  let fixture: ComponentFixture<VoitureListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoitureListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
