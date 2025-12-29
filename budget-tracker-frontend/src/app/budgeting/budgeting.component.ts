import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService, ExpenseHeadDto, BudgetCreateRequest, ExpenseHeadCreateRequest, BudgetUpdateRequest, BudgetResponseDto } from '../services/budget.service';

@Component({
  selector: 'app-budgeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgeting.component.html',
  styleUrls: ['./budgeting.component.css']
})
export class BudgetingComponent implements OnInit, AfterViewInit {
  // Budget Allocation Form
  expenseHeads: ExpenseHeadDto[] = [];
  budgetAmountAllocated: number = 0;
  budgets: BudgetResponseDto[] = [];
  model: { expenseHeadId: number | null; allocatedAmount: number | null } = {
    expenseHeadId: null,
    allocatedAmount: null
  };

  // Messages & Loading States
  successMessage = '';
  errorMessage = '';
  isLoading = false;
  familyMonthlyIncome = 0;

  // Expense Head Modal
  @ViewChild('addExpenseHeadModal') addExpenseHeadModalElement!: ElementRef;
  addExpenseHeadModal: any;
  
  // Modal Form Data for Add Expense Head
  expenseHeadForm = {
    name: '',
    description: ''
  };
  addExpenseHeadErrorMessage = '';
  addExpenseHeadLoading = false;

  // Edit Budget Modal
  @ViewChild('editBudgetModal') editBudgetModalElement!: ElementRef;
  editBudgetModal: any;
  
  // Edit Budget Form Data
  editBudgetForm = {
    budgetId: 0,
    expenseHeadName: '',
    allocatedAmount: 0,
    originalAmount: 0
  };
  editBudgetErrorMessage = '';
  editBudgetLoading = false;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadExpenseHeads();
    this.fetchBudgetDetails();
    this.familyMonthlyIncome = 200000; // Example static value; replace with actual user data as needed
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is rendered
    const bootstrapModal = (window as any).bootstrap;
    
    // Add Expense Head Modal
    if (this.addExpenseHeadModalElement && this.addExpenseHeadModalElement.nativeElement && bootstrapModal) {
      this.addExpenseHeadModal = new bootstrapModal.Modal(this.addExpenseHeadModalElement.nativeElement);
    }
    
    // Edit Budget Modal
    if (this.editBudgetModalElement && this.editBudgetModalElement.nativeElement && bootstrapModal) {
      this.editBudgetModal = new bootstrapModal.Modal(this.editBudgetModalElement.nativeElement);
    }
  }

  // ===== EXPENSE HEAD MODAL METHODS =====

  loadExpenseHeads(): void {
    this.budgetService.getExpenseHeads().subscribe({
      next: (list) => (this.expenseHeads = list),
      error: (err) => (this.errorMessage = 'Failed to load expense heads')
    });
  }

  onExpenseHeadChange(): void {
    if (this.model.expenseHeadId === -1) {
      this.model.expenseHeadId = null;
      this.openAddExpenseHeadModal();
    }
  }

  calculateBudgetUtilization(): number {
    const totalBudgeted = this.budgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
    return this.familyMonthlyIncome ? (totalBudgeted / this.familyMonthlyIncome) * 100 : 0;
  }

  openAddExpenseHeadModal(): void {
    this.expenseHeadForm = { name: '', description: '' };
    this.addExpenseHeadErrorMessage = '';
    
    if (this.addExpenseHeadModal) {
      this.addExpenseHeadModal.show();
    } else {
      console.error('Add Expense Head modal not initialized.');
    }
  }

  closeAddExpenseHeadModal(): void {
    if (this.addExpenseHeadModal) {
      this.addExpenseHeadModal.hide();
    }
  }

  validateExpenseHeadForm(): { valid: boolean; error?: string } {
    const trimmedName = this.expenseHeadForm.name.trim();

    if (!trimmedName) {
      return { valid: false, error: 'Expense head name is required.' };
    }

    const isDuplicate = this.expenseHeads.some(
      (head) => head.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      return { valid: false, error: 'An expense head with this name already exists.' };
    }

    return { valid: true };
  }

  submitExpenseHead(): void {
    this.addExpenseHeadErrorMessage = '';

    const validation = this.validateExpenseHeadForm();
    if (!validation.valid) {
      this.addExpenseHeadErrorMessage = validation.error || 'Validation failed.';
      return;
    }

    const payload: ExpenseHeadCreateRequest = {
      name: this.expenseHeadForm.name.trim()
    };

    this.addExpenseHeadLoading = true;

    this.budgetService.createExpenseHead(payload).subscribe({
      next: (newHead) => {
        this.addExpenseHeadLoading = false;
        this.expenseHeads.push(newHead);
        this.model.expenseHeadId = newHead.id;
        this.closeAddExpenseHeadModal();
        this.successMessage = `Expense head "${newHead.name}" created successfully!`;
        this.expenseHeadForm = { name: '', description: '' };
      },
      error: (err) => {
        this.addExpenseHeadLoading = false;
        this.addExpenseHeadErrorMessage = 'Failed to create expense head. Please try again.';
        console.error('Error creating expense head:', err);
      }
    });
  }

  onAddExpenseHeadModalHide(): void {
    this.expenseHeadForm = { name: '', description: '' };
    this.addExpenseHeadErrorMessage = '';
  }

  // ===== EDIT BUDGET MODAL METHODS =====

  openEditBudgetModal(budget: any): void {
    this.editBudgetForm = {
      budgetId: budget.id,
      expenseHeadName: budget.expenseHead.name,
      allocatedAmount: budget.allocatedAmount,
      originalAmount: budget.allocatedAmount
    };
    this.editBudgetErrorMessage = '';
    
    if (this.editBudgetModal) {
      this.editBudgetModal.show();
    } else {
      console.error('Edit Budget modal not initialized.');
    }
  }

  closeEditBudgetModal(): void {
    if (this.editBudgetModal) {
      this.editBudgetModal.hide();
    }
  }

  validateEditBudgetForm(): { valid: boolean; error?: string } {
    const amount = this.editBudgetForm.allocatedAmount;

    if (amount == null || amount === 0) {
      return { valid: false, error: 'Allocation amount is required and must be greater than 0.' };
    }

    if (amount < 0) {
      return { valid: false, error: 'Allocation amount must be a positive number.' };
    }

    if (amount === this.editBudgetForm.originalAmount) {
      return { valid: false, error: 'No changes were made to the allocation amount.' };
    }

    return { valid: true };
  }

  submitEditBudget(): void {
    this.editBudgetErrorMessage = '';

    const validation = this.validateEditBudgetForm();
    if (!validation.valid) {
      this.editBudgetErrorMessage = validation.error || 'Validation failed.';
      return;
    }

    const payload: BudgetUpdateRequest = {
      allocatedAmount: this.editBudgetForm.allocatedAmount
    };

    this.editBudgetLoading = true;

    this.budgetService.updateBudget(this.editBudgetForm.budgetId, payload).subscribe({
      next: (updatedBudget) => {
        this.editBudgetLoading = false;
        
        const index = this.budgets.findIndex(b => b.id === this.editBudgetForm.budgetId);
        if (index !== -1) {
          this.budgets[index].allocatedAmount = updatedBudget.allocatedAmount;
        }
        
        this.budgetAmountAllocated = this.budgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
        this.closeEditBudgetModal();
        this.successMessage = `Budget allocation updated successfully!`;
      },
      error: (err) => {
        this.editBudgetLoading = false;
        this.editBudgetErrorMessage = 'Failed to update budget allocation. Please try again.';
        console.error('Error updating budget:', err);
      }
    });
  }

  onEditBudgetModalHide(): void {
    this.editBudgetForm = {
      budgetId: 0,
      expenseHeadName: '',
      allocatedAmount: 0,
      originalAmount: 0
    };
    this.editBudgetErrorMessage = '';
  }

  // ===== BUDGET ALLOCATION METHODS =====

  onSubmit(): void {
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

    this.isLoading = true;

    this.budgetService.createBudget(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Budget saved successfully.';
        this.model.allocatedAmount = null;
        this.fetchBudgetDetails();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to save budget.';
        console.error(err);
      }
    });
  }

  fetchBudgetDetails(): void {
    this.budgetService.getBudgetDetails(100).subscribe({
      next: (list) => {
        this.budgets = list.map(budget => ({
          id: budget.id,
          expenseHead: budget.expenseHead,
          allocatedAmount: budget.allocatedAmount
        }));
        this.budgetAmountAllocated = this.budgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
      },
      error: (err) => (this.errorMessage = 'Failed to load budget details')
    });
  }
}
