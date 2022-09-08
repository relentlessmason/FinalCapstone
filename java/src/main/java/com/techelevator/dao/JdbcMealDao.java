package com.techelevator.dao;

import com.techelevator.model.Meal;
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
        String sql = "select * from meal;";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            Meal meal = mapToRowMeal(results);
            meals.add(meal);
        }

        return meals.toArray(new Meal[0]);
    }

    @Override
    public Meal[] findAllMealsByUserId(Long id) {
        List<Meal> meals = new ArrayList<>();
        String sql = "SELECT * FROM meal m " +
                "JOIN meal_account ma ON ma.meal_id=m.meal_id " +
                "WHERE ma.user_id = ?;";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        while(results.next()) {
            Meal meal = mapToRowMeal(results);
            meals.add(meal);
        }

        return meals.toArray(new Meal[0]);
    }

    @Override
    public Meal getMealById(Long mealId) {
        String sql = "SELECT * FROM meal WHERE meal_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, mealId);
        if (results.next()) {
            return mapToRowMeal(results);
        } else {
            throw new RuntimeException("Meal Id " + mealId + " was not found");
        }
    }

    @Override
    public Meal findByIngredient(String ingredients) {
        String sql= "SELECT meal_name FROM meal WHERE ingredients LIKE ? ";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, ingredients);
        if (results.next()) {
            return mapToRowMeal(results);
        } else {
            throw new RuntimeException("Whoops no meals where found that contained " + ingredients + "try something else");
        }
    }

    @Override
    public Meal findByMealName(String mealName) {
        String sql = "SELECT meal_name FROM meal WHERE meal_name LIKE ? ";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, mealName );
        if (results.next()) {
            return mapToRowMeal(results);
        } else {
            throw new RuntimeException("No meal by the name of " + mealName + " can be found");
        }
    }

    @Override
    public Long findIdByMealName(String mealName) {
        return jdbcTemplate.queryForObject
                ("SELECT meal_id FROM meal WHERE meal_name LIKE ?;", Long.class, mealName);

    }

    @Override
    public Long addMeal(Meal meal) {
        String SQL = "INSERT INTO meal" +
                " (meal_name, " +
                "category_id, " +
                "time_of_day_id, " +
                "description, " +
                "recipe, " +
                "ingredients) " +
                "VALUES (?, ?, ?, ?, ?, ?)" +
                " RETURNING meal_id;";

        Long mealId= jdbcTemplate.queryForObject(SQL, Long.class,
                meal.getMealName(),
                meal.getCategoryId(),
                meal.getTimeOfDayId(),
                meal.getDescription(),
                meal.getRecipe(),
                meal.getIngredients());
        return mealId;
    }

    @Override
    public boolean deleteMeal(Long id) {
        String sql = "DELETE from meal where meal_id = ?;";
        return jdbcTemplate.update(sql, id) == 1;
    }

    @Override
    public void updateMeal(Long mealId, Meal meal) {
        String sql = "UPDATE meal " +
                "SET meal_name = ?, " +
                "category_id = ?, " +
                "time_of_day_id = ?, " +
                "description = ?, " +
                "recipe = ?, " +
                "ingredients = ? " +
                "WHERE meal_id=?;";
        jdbcTemplate.update(sql,
                meal.getMealName(),
                meal.getCategoryId(),
                meal.getTimeOfDayId(),
                meal.getDescription(),
                meal.getRecipe(),
                meal.getIngredients(),
                mealId);
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
