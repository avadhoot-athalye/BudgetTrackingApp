package com.example.demo.controller;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid;

import com.example.demo.dto.BudgetCreateRequest;
import com.example.demo.dto.BudgetDto;
import com.example.demo.services.BudgetService;

@RestController
@RequestMapping("/api/budgets")
public class BudgetWriteController {

    private final BudgetService budgetService;

    public BudgetWriteController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BudgetDto> createBudget(@Valid @RequestBody BudgetCreateRequest req) {
        BudgetDto created = budgetService.addBudget(req);
        // Location: /api/users/100/budgets/{expenseHeadId}
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/users/{userId}/budgets/{expenseHeadId}")
                .buildAndExpand(100, created.getId().getExpenseHeadId()).toUri();
        return ResponseEntity.created(location).body(created);
    }

}
