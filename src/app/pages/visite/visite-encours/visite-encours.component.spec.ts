import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteEncoursComponent } from './visite-encours.component';

describe('VisiteEncoursComponent', () => {
  let component: VisiteEncoursComponent;
  let fixture: ComponentFixture<VisiteEncoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteEncoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisiteEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
