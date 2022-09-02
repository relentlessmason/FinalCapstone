package com.techelevator.model;

public class MealAccount {

    private Long mealId;
    private Long userId;

    public MealAccount() {
    }

    @Override
    public String toString() {
        return "MealAccount{" +
                "accountId=" + mealId +
                ", userId=" + userId +
                '}';
    }

    public MealAccount(Long mealId, Long userId) {
        this.mealId = mealId;
        this.userId = userId;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}