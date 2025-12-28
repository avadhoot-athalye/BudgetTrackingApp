import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExpenseHeadDto {
  id: number;
  name: string;
}

export interface ExpenseHeadCreateRequest {
  name: string;
}

export interface BudgetCreateRequest {
  expenseHeadId: number;
  allocatedAmount: number;
}

export interface BudgetDto {
  id: { expenseHeadId: number };
  allocatedAmount: number;
}

export interface BudgetResponseDto {
    id: number;
    expenseHead: ExpenseHeadDto;
    allocatedAmount: number;
}

@Injectable({ providedIn: 'root' })
export class BudgetService {
  // Use relative '/api' so the Angular dev server proxy can forward requests to the backend
  // If you prefer an absolute backend address, change this or inject via environment
  private base = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getExpenseHeads(): Observable<ExpenseHeadDto[]> {
    return this.http.get<ExpenseHeadDto[]>(`${this.base}/expense-heads`);
  }

  createExpenseHead(req: ExpenseHeadCreateRequest): Observable<ExpenseHeadDto> {
    return this.http.post<ExpenseHeadDto>(`${this.base}/expense-heads`, req);
  }

  getBudgetDetails(userId: number): Observable<BudgetResponseDto[]> {
    return this.http.get<BudgetResponseDto[]>(`${this.base}/users/${userId}/budgets`);
  }

  createBudget(req: BudgetCreateRequest): Observable<BudgetDto> {
    return this.http.post<BudgetDto>(`${this.base}/budgets`, req);
  }
}
