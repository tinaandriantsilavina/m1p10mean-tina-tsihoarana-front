import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierVisiteComponent } from './atelier-visite.component';

describe('AtelierVisiteComponent', () => {
  let component: AtelierVisiteComponent;
  let fixture: ComponentFixture<AtelierVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtelierVisiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelierVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
