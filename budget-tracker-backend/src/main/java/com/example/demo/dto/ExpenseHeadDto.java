package com.example.demo.dto;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "expense_head")
public class ExpenseHeadDto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String name;
	private Character isActiveSw;
	private Long userId;
	private Character defaultSw;
	private LocalDate createdDt;

	// No-arg constructor for Jackson
	public ExpenseHeadDto() {
	}

	public ExpenseHeadDto(Long id, String name, Character isActiveSw, Long userId, Character defaultSw,
			LocalDate createdDt) {
		super();
		this.id = id;
		this.name = name;
		this.isActiveSw = isActiveSw;
		this.userId = userId;
		this.defaultSw = defaultSw;
		this.createdDt = createdDt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Character getIsActiveSw() {
		return isActiveSw;
	}

	public void setIsActiveSw(Character isActiveSw) {
		this.isActiveSw = isActiveSw;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Character getDefaultSw() {
		return defaultSw;
	}

	public void setDefaultSw(Character defaultSw) {
		this.defaultSw = defaultSw;
	}

	public LocalDate getCreatedDt() {
		return createdDt;
	}

	public void setCreatedDt(LocalDate createdDt) {
		this.createdDt = createdDt;
	}

}
