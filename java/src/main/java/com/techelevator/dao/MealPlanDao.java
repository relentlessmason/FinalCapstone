package com.techelevator.dao;


import com.techelevator.model.MealPlan;
import com.techelevator.model.MealPlanJoin;

public interface MealPlanDao {

    MealPlan[] findAllMealPlans();

    MealPlanJoin[] findMealPlanByUserId(Long id);

    void addMealPlan(MealPlan mealPlan);

    void deleteMealPlan(Long id);

}
