package com.techelevator.dao;

import com.techelevator.model.Meal;

import java.util.List;

public interface MealDao {

    Meal[] findAllMeals();

    Meal[] findAllMealsByUserId(Long id);

    Meal getMealById(Long userId);

    Meal findByIngredient(String username);

    Meal findByMealName(String username);

    Long findIdByMealName(String username);

    Long addMeal(Meal meal);

    boolean deleteMeal(Long id);

    void updateMeal(Long mealId, Meal meal);

}
