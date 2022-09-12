package com.techelevator.dao;


import com.techelevator.model.MealIngredients;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.List;


public interface MealIngredientsDao  {


    List<MealIngredients> findAllIngredients();

    MealIngredients getIngredientsById(Long ingredientId);

    MealIngredients findByIngredients(String ingredients);

    long addIngredient(Long mealId, String ingredientName, int qty);

    boolean deleteIngredient(int ingredient_id);

    MealIngredients mapToRowMealIngredients(SqlRowSet mI);
}
