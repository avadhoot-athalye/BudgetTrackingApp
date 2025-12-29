package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.BudgetDto;
import com.example.demo.dto.BudgetId;

public interface BudgetRepository extends JpaRepository<BudgetDto, BudgetId> {
    // Spring Data will derive query from embedded id property name: findByIdUserId
    List<BudgetDto> findAllByIdUserIdOrderByAllocatedAmountDesc(Long userId);
    Optional<BudgetDto> findByIdUserIdAndIdExpenseHeadId(Long userId, Long expenseHeadId);
}
