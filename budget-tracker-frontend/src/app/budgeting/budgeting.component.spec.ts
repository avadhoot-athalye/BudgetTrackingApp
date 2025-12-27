import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { BudgetingComponent } from './budgeting.component';
import { BudgetService } from '../services/budget.service';

describe('BudgetingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetingComponent],
      providers: [
        {
          provide: BudgetService,
          useValue: {
            getExpenseHeads: () => of([]),
            createBudget: () => of({ id: { expenseHeadId: 1 }, allocatedAmount: 100 })
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BudgetingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
