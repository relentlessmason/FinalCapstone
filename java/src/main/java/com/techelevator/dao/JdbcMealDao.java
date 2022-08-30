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
    public Meal getMealById(Long userId) {
        return null;
    }

    @Override
    public Meal findByIngredient(String username) {
        return null;
    }

    @Override
    public Meal findByMealName(String username) {
        return null;
    }

    @Override
    public Long findIdByMealName(String username) {
        return null;
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
