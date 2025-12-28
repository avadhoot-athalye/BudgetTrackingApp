import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService, ExpenseHeadDto, BudgetCreateRequest, ExpenseHeadCreateRequest } from '../services/budget.service';

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
  budgets: { expenseHead: string; allocatedAmount: number }[] = [];
  model: { expenseHeadId: number | null; allocatedAmount: number | null } = {
    expenseHeadId: null,
    allocatedAmount: null
  };

  // Messages & Loading States
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  // Expense Head Modal
  @ViewChild('addExpenseHeadModal') modalElement!: ElementRef;
  modal: any;
  
  // Modal Form Data
  expenseHeadForm = {
    name: '',
    description: ''
  };
  modalErrorMessage = '';
  isModalLoading = false;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadExpenseHeads();
    this.fetchBudgetDetails();
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modal after view is rendered
    if (this.modalElement && this.modalElement.nativeElement) {
      const bootstrapModal = (window as any).bootstrap;
      if (bootstrapModal) {
        this.modal = new bootstrapModal.Modal(this.modalElement.nativeElement);
      }
    }
  }

  // ===== EXPENSE HEAD MODAL METHODS =====

  /**
   * Load expense heads from backend
   */
  loadExpenseHeads(): void {
    this.budgetService.getExpenseHeads().subscribe({
      next: (list) => (this.expenseHeads = list),
      error: (err) => (this.errorMessage = 'Failed to load expense heads')
    });
  }

  /**
   * Handle dropdown change - check if "add new" option was selected
   */
  onExpenseHeadChange(): void {
    // Check if the special "add-new" value was selected
    if (this.model.expenseHeadId === -1) {
      // Reset the dropdown value
      this.model.expenseHeadId = null;
      // Open the modal
      this.openAddExpenseHeadModal();
    }
  }

  /**
   * Open Add Expense Head modal
   */
  openAddExpenseHeadModal(): void {
    // Reset form
    this.expenseHeadForm = { name: '', description: '' };
    this.modalErrorMessage = '';
    
    if (this.modal) {
      this.modal.show();
    } else {
      console.error('Modal not initialized. Make sure Bootstrap JS is loaded.');
    }
  }

  /**
   * Close the modal
   */
  closeAddExpenseHeadModal(): void {
    if (this.modal) {
      this.modal.hide();
    }
  }

  /**
   * Validate expense head form input
   */
  validateExpenseHeadForm(): { valid: boolean; error?: string } {
    const trimmedName = this.expenseHeadForm.name.trim();

    // Check if name is empty
    if (!trimmedName) {
      return { valid: false, error: 'Expense head name is required.' };
    }

    // Check for duplicate (case-insensitive)
    const isDuplicate = this.expenseHeads.some(
      (head) => head.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      return { valid: false, error: 'An expense head with this name already exists.' };
    }

    return { valid: true };
  }

  /**
   * Submit new expense head
   */
  submitExpenseHead(): void {
    this.modalErrorMessage = '';

    // Validate
    const validation = this.validateExpenseHeadForm();
    if (!validation.valid) {
      this.modalErrorMessage = validation.error || 'Validation failed.';
      return;
    }

    // Prepare payload
    const payload: ExpenseHeadCreateRequest = {
      name: this.expenseHeadForm.name.trim()
    };

    this.isModalLoading = true;

    // Call API
    this.budgetService.createExpenseHead(payload).subscribe({
      next: (newHead) => {
        this.isModalLoading = false;
        
        // Add to list
        this.expenseHeads.push(newHead);
        
        // Auto-select the newly created head
        this.model.expenseHeadId = newHead.id;
        
        // Close modal
        this.closeAddExpenseHeadModal();
        
        // Show success message
        this.successMessage = `Expense head "${newHead.name}" created successfully!`;
        
        // Clear form
        this.expenseHeadForm = { name: '', description: '' };
      },
      error: (err) => {
        this.isModalLoading = false;
        this.modalErrorMessage = 'Failed to create expense head. Please try again.';
        console.error('Error creating expense head:', err);
      }
    });
  }

  /**
   * Handle modal close button - reset form
   */
  onModalHide(): void {
    this.expenseHeadForm = { name: '', description: '' };
    this.modalErrorMessage = '';
  }

  // ===== BUDGET ALLOCATION METHODS =====

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

    this.isLoading = true;

    this.budgetService.createBudget(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Budget saved successfully.';
        // Reset form partially
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
