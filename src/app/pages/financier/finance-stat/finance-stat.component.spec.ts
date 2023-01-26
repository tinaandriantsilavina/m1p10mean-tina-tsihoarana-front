import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceStatComponent } from './finance-stat.component';

describe('FinanceStatComponent', () => {
  let component: FinanceStatComponent;
  let fixture: ComponentFixture<FinanceStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
