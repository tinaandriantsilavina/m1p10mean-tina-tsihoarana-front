import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierReparationListComponent } from './atelier-reparation-list.component';

describe('AtelierReparationListComponent', () => {
  let component: AtelierReparationListComponent;
  let fixture: ComponentFixture<AtelierReparationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtelierReparationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelierReparationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
