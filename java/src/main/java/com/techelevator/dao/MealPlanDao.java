package com.techelevator.dao;


import com.techelevator.model.MealPlan;

public interface MealPlanDao {

    MealPlan[] findAllMealPlans();

    MealPlan[] findMealPlanByUserId(Long id);

    void addMealPlan(MealPlan mealPlan);

    void deleteMealPlan(Long id);

}
