import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Expenses</h2>
      <p class="lead">Placeholder for listing and adding expenses.</p>
    </div>
  `
})
export class ExpensesComponent {}
