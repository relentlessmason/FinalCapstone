package com.techelevator.model;

public class MealAccount {

    private Long accountId;
    private Long userId;

    public MealAccount() {
    }

    @Override
    public String toString() {
        return "MealAccount{" +
                "accountId=" + accountId +
                ", userId=" + userId +
                '}';
    }

    public MealAccount(Long accountId, Long userId) {
        this.accountId = accountId;
        this.userId = userId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
