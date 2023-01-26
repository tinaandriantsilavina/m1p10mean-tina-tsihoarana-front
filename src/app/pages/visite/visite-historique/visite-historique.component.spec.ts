import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteHistoriqueComponent } from './visite-historique.component';

describe('VisiteHistoriqueComponent', () => {
  let component: VisiteHistoriqueComponent;
  let fixture: ComponentFixture<VisiteHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisiteHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
