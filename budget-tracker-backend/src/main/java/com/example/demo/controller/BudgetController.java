package com.example.demo.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BudgetDto;
import com.example.demo.services.BudgetService;

@RestController
@RequestMapping("/api/users/{userId}/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BudgetDto>> getBudgetsForUser(@PathVariable("userId") Long userId) {
        List<BudgetDto> budgets = budgetService.getBudgetsByUserId(userId);
        return ResponseEntity.ok(budgets);
    }

}
