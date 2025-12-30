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
		loadComponent: () => import('./budgeting/budgeting.component').then(m => m.BudgetingComponent)
	},
	{
		path: 'expenses',
		loadComponent: () => import('./expense-details/expense-details.component').then(m => m.ExpenseDetailsComponent)
	},
	{
		path: 'reports',
		loadComponent: () => import('./budget-reports/budget-reports.component').then(m => m.BudgetReportsComponent)
	}
];
