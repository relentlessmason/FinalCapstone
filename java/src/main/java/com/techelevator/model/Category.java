package com.techelevator.model;

public class Category {
    private Long categoryId;
    private String categoryTypeDesc;

    public Category(Long categoryId, String categoryTypeDesc) {
        this.categoryId = categoryId;
        this.categoryTypeDesc = categoryTypeDesc;
    }

    public Category() {
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryTypeDesc() {
        return categoryTypeDesc;
    }

    public void setCategoryTypeDesc(String categoryTypeDesc) {
        this.categoryTypeDesc = categoryTypeDesc;
    }
}
