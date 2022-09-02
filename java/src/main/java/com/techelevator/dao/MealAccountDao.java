package com.techelevator.dao;

import com.techelevator.model.Meal;
import com.techelevator.model.MealAccount;
import com.techelevator.model.User;

public interface MealAccountDao {

    MealAccount[] findAllAccounts();

    void addMealAccount(Long mealId, Long userId);

    MealAccount getAccountById(Long userId);
}
