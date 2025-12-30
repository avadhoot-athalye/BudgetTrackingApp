import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetReportsComponent } from './budget-reports.component';

describe('BudgetReportsComponent', () => {
  let component: BudgetReportsComponent;
  let fixture: ComponentFixture<BudgetReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
