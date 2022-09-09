package com.techelevator.dao;

import com.techelevator.model.MealIngredients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

public class JdbcMealIngredients implements MealIngredientsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public JdbcMealIngredients(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public MealIngredients[] findAllIngredients() {
        List<MealIngredients> ingredients = new ArrayList<>();
        String sql = "select * from meal_ingredients;";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql );
        while(results.next()) {
            MealIngredients mealIngredients = mapToRowMealIngredients(results);
            ingredients.add(mealIngredients);
        }
        return ingredients.toArray(new MealIngredients[0]);

    }

    public MealIngredients getIngredientsById(Long ingredientId) {
        String sql = "SELECT * FROM meal_ingredient WHERE ingredient_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, ingredientId);
        if (results.next()) {
            return mapToRowMealIngredients(results );
        } else {
            throw new RuntimeException("Whoops Ingredient Id " + ingredientId + " was not found, ");
        }
    }

    public MealIngredients findByIngredients (String ingredients) {
        String sql = "SELECT ingredients_name FROM meal_ingredients WHERE ingredient_name LIKE ?;";
        SqlRowSet results = jdbcTemplate. queryForRowSet(sql, ingredients);
        if (results.next()) {
            return mapToRowMealIngredients(results);
        } else {
            throw new RuntimeException("Nope! no ingredients named "+ ingredients + " exists, try again");

        }
    }
    public long addIngredient(Long mealId, String ingredientName, int qty) {
        MealIngredients mealIngredients;
        mealIngredients = new MealIngredients();
        String sql = "INSERT into meal_ingredients (meal_id, ingredient_name, qty)" +
                "VALUES (?,?,?)" +
                "RETURNING ingredients_id";
        long ingredientId = jdbcTemplate.queryForObject(sql, int.class, mealId, ingredientName, qty);
        mealIngredients.setIngredientsId((long) ingredientId);
        return ingredientId;
    }


//
//        jdbcTemplate.update(SQL,
//                MealIngredients.getMealId(),
//                MealIngredients.getIngredientId(),
//                MealIngredients.getQty());
//
//
//    }

    public boolean deleteIngredient (int ingredient_id) {
        String sql = "DELETE FROM meal WHERE ingredients_id = ?;";
        return jdbcTemplate.update(sql,ingredient_id) == 1;
    }


    private MealIngredients mapToRowMealIngredients(SqlRowSet mI) {
        MealIngredients mealIngredients = new MealIngredients();
        mealIngredients.setIngredientsId(mI.getLong("ingredients_id"));
        mealIngredients.setIngredients_name(mI.getString("ingredients_name"));
        mealIngredients.setQty(mI.getInt("qty"));
        return mealIngredients;
    };

}
