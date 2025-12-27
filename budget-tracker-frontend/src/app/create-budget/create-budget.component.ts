import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-budget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Create Budget</h2>
      <p class="lead">Placeholder for creating a new budget. Integrate form here.</p>
    </div>
  `
})
export class CreateBudgetComponent {}
