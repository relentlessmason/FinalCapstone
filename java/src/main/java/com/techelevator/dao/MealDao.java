package com.techelevator.dao;

import com.techelevator.model.Meal;

import java.util.List;

public interface MealDao {

    Meal[] findAllMeals();

    Meal getMealById(Long userId);

    Meal findByIngredient(String username);

    Meal findByMealName(String username);

    Long findIdByMealName(String username);

    void addMeal(Meal meal);

    boolean deleteMeal(Long id);

}
