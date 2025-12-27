package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;

public class BudgetCreateRequest {

    @NotNull
    private Long expenseHeadId;

    @NotNull
    private Double allocatedAmount;

    public Long getExpenseHeadId() {
        return expenseHeadId;
    }

    public void setExpenseHeadId(Long expenseHeadId) {
        this.expenseHeadId = expenseHeadId;
    }

    public Double getAllocatedAmount() {
        return allocatedAmount;
    }

    public void setAllocatedAmount(Double allocatedAmount) {
        this.allocatedAmount = allocatedAmount;
    }

}
