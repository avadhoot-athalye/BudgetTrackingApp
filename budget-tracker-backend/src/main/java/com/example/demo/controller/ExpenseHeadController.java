package com.example.demo.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid;

import com.example.demo.dto.ExpenseHeadDto;
import com.example.demo.services.ExpenseHeadService;

@RestController
@RequestMapping("/api/expense-heads")
public class ExpenseHeadController {

	private final ExpenseHeadService expenseHeadService;

	public ExpenseHeadController(ExpenseHeadService expenseHeadService) {
		this.expenseHeadService = expenseHeadService;
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpenseHeadDto>> getExpenseHeads() {
		List<ExpenseHeadDto> list = expenseHeadService.getAllExpenseHeads();
		return ResponseEntity.ok(list);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ExpenseHeadDto> addExpenseHead(@Valid @RequestBody ExpenseHeadDto expenseHead) {
		ExpenseHeadDto created = this.expenseHeadService.addExpenseHead(expenseHead);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(created.getId()).toUri();
		return ResponseEntity.created(location).body(created);
	}

}
