import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService, ExpenseHeadDto, BudgetCreateRequest } from '../services/budget.service';

@Component({
  selector: 'app-budgeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgeting.component.html',
  styleUrls: ['./budgeting.component.css']
})
export class BudgetingComponent implements OnInit {
  expenseHeads: ExpenseHeadDto[] = [];
  budgetAmountAllocated: number = 0;
  // Hard-coded budget rows for display purposes (will be fetched from DB later)
  budgets: { expenseHead: string; allocatedAmount: number }[] = [];
  model: { expenseHeadId: number | null; allocatedAmount: number | null } = {
    expenseHeadId: null,
    allocatedAmount: null
  };

  successMessage = '';
  errorMessage = '';

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.budgetService.getExpenseHeads().subscribe({
      next: (list) => (this.expenseHeads = list),
      error: (err) => (this.errorMessage = 'Failed to load expense heads')
    });
    this.fetchBudgetDetails();
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.model.expenseHeadId || this.model.allocatedAmount == null) {
      this.errorMessage = 'Please select an expense head and enter a valid amount.';
      return;
    }

    const payload: BudgetCreateRequest = {
      expenseHeadId: this.model.expenseHeadId,
      allocatedAmount: this.model.allocatedAmount
    };

    this.budgetService.createBudget(payload).subscribe({
      next: (res) => {
        this.successMessage = 'Budget saved successfully.';
        // Reset form partially
        this.model.allocatedAmount = null;
        this.fetchBudgetDetails();
      },
      error: (err) => {
        this.errorMessage = 'Failed to save budget.';
        console.error(err);
      }
    });

  }

  fetchBudgetDetails() {
    this.budgetService.getBudgetDetails(100).subscribe({
      next: (list) => {
        this.budgets = list.map(budget => ({
          expenseHead: budget.expenseHead.name,
          allocatedAmount: budget.allocatedAmount
        }));
        this.budgetAmountAllocated = this.budgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
      },
      error: (err) => (this.errorMessage = 'Failed to load budget details')
    });
  }

}
