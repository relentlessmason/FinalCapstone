package com.techelevator.dao;

import com.techelevator.model.Meal;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcMealDao implements MealDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public JdbcMealDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Meal[] findAllMeals() {
        List<Meal> meals = new ArrayList<>();
        String sql = "select * from meals;";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            Meal meal = mapToRowMeal(results);
            meals.add(meal);
        }

        return meals.toArray(new Meal[0]);
    }

    @Override
    public Meal getMealById(Long mealId) {
        String sql = "SELECT * FROM meals WHERE meal_id = ?"
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, mealId);
        if (results.next()) {
            return mapToRowMeal(results);
        } else {
            throw new RuntimeException("Meal Id " + mealId + " was not found");
        }
    }

    @Override
    public Meal findByIngredient(String ingredients) {
        String sql= "SELECT meal_name FROM meals WHERE ingredients LIKE ? "
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, ingredients);
        if (results.next()) {
            return mapToRowMeal(results);
        } else {
            throw new RuntimeException("Whoops no meals where found that contained " + ingredients + "try something else");
        }
    }

    @Override
    public Meal findByMealName(String mealName) {
        String sql = "SELECT meal_name FROM meals WHERE meal_name LIKE ? "
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, mealName );
        if (results.next()) {
            return mapToRowMeal(results);
        } else {
            throw new RuntimeException("No meal by the name of " + mealName + " can be found");
        }
    }

    @Override
    public long findIdByMealName(String mealName) {
        return jdbcTemplate.queryForObject("SELECT meal_id FROM meals WHERE meal_name LIKE ? ", long.class, mealName);

    }

    private Meal mapToRowMeal(SqlRowSet m) {
        Meal meal = new Meal();
        meal.setId(m.getLong("meal_id"));
        meal.setMealName(m.getString("meal_name"));
        meal.setCategoryId(m.getLong("category_id"));
        meal.setTimeOfDayId(m.getLong("time_of_day_id"));
        meal.setDescription(m.getString("description"));
        meal.setRecipe(m.getString("recipe"));
        meal.setIngredients(m.getString("ingredients"));
        return meal;
    }
}
