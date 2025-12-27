package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BudgetDto;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.ExpenseHeadRepository;
import com.example.demo.dto.BudgetCreateRequest;
import com.example.demo.dto.BudgetId;
import com.example.demo.dto.ExpenseHeadDto;

@Service
public class BudgetService {

	private final BudgetRepository budgetRepository;
	private final ExpenseHeadRepository expenseHeadRepository;

	public BudgetService(BudgetRepository budgetRepository, ExpenseHeadRepository expenseHeadRepository) {
		this.budgetRepository = budgetRepository;
		this.expenseHeadRepository = expenseHeadRepository;
	}

	public List<BudgetDto> getBudgetsByUserId(Long userId) {
		return budgetRepository.findByIdUserId(userId);
	}

	public BudgetDto addBudget(BudgetCreateRequest req) {
		// hard-coded user id for now
		Long userId = 100L;
		Long expenseHeadId = req.getExpenseHeadId();

		ExpenseHeadDto expenseHead = expenseHeadRepository.findById(expenseHeadId)
				.orElseThrow(() -> new IllegalArgumentException("ExpenseHead not found: " + expenseHeadId));

		BudgetId id = new BudgetId(userId, expenseHeadId);
		BudgetDto budget = new BudgetDto();
		budget.setId(id);
		budget.setExpenseHead(expenseHead);
		budget.setAllocatedAmount(req.getAllocatedAmount());

		return budgetRepository.save(budget);
	}

}
