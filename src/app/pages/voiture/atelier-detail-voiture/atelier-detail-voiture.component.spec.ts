import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierDetailVoitureComponent } from './atelier-detail-voiture.component';

describe('AtelierDetailVoitureComponent', () => {
  let component: AtelierDetailVoitureComponent;
  let fixture: ComponentFixture<AtelierDetailVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtelierDetailVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelierDetailVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
