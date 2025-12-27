package com.example.demo.dto;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class BudgetId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "expense_head_id")
    private Long expenseHeadId;

    public BudgetId() {
    }

    public BudgetId(Long userId, Long expenseHeadId) {
        this.userId = userId;
        this.expenseHeadId = expenseHeadId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getExpenseHeadId() {
        return expenseHeadId;
    }

    public void setExpenseHeadId(Long expenseHeadId) {
        this.expenseHeadId = expenseHeadId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        BudgetId that = (BudgetId) o;
        return (userId != null ? userId.equals(that.userId) : that.userId == null)
                && (expenseHeadId != null ? expenseHeadId.equals(that.expenseHeadId) : that.expenseHeadId == null);
    }

    @Override
    public int hashCode() {
        int result = (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (expenseHeadId != null ? expenseHeadId.hashCode() : 0);
        return result;
    }
}
