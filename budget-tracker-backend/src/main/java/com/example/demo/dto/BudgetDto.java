package com.example.demo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "budget_details")
@AllArgsConstructor
@NoArgsConstructor
public class BudgetDto {

	@EmbeddedId
	private BudgetId id;

	// Maps the expenseHead part of the composite key
	@ManyToOne(optional = false)
	@MapsId("expenseHeadId")
	@JoinColumn(name = "expense_head_id", referencedColumnName = "id")
	private ExpenseHeadDto expenseHead;

	@Column(name = "allocated_amount")
	private Double allocatedAmount;

	// convenience getter for userId
	public Long getUserId() {
		return id != null ? id.getUserId() : null;
	}

}
