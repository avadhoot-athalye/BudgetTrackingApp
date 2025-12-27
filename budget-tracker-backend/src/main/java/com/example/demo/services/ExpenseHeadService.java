package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ExpenseHeadDto;
import com.example.demo.repository.ExpenseHeadRepository;

@Service
public class ExpenseHeadService {
	
	@Autowired
	private ExpenseHeadRepository expenseHeadRepo;

	public List<ExpenseHeadDto> getAllExpenseHeads() {
		return expenseHeadRepo.findAll(); // defensive copy
	}

	public ExpenseHeadDto addExpenseHead(ExpenseHeadDto expenseHead) {
		expenseHead.setDefaultSw('N');
		expenseHead.setCreatedDt(LocalDate.now());
		expenseHead.setIsActiveSw('Y');
		expenseHead.setUserId(100L);
		expenseHeadRepo.save(expenseHead);
		return expenseHead;
	}
}
