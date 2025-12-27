import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Reports</h2>
      <p class="lead">Placeholder for budget/expense reports and overspending alerts.</p>
    </div>
  `
})
export class ReportsComponent {}
