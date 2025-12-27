import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'budgeting', pathMatch: 'full' },
	{
		path: 'budgeting',
		loadComponent: () =>
			import('./budgeting/budgeting.component').then((m) => m.BudgetingComponent),
	},
	{
		path: 'create-budget',
		loadComponent: () => import('./create-budget/create-budget.component').then(m => m.CreateBudgetComponent)
	},
	{
		path: 'expenses',
		loadComponent: () => import('./expenses/expenses.component').then(m => m.ExpensesComponent)
	},
	{
		path: 'reports',
		loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent)
	}
];
