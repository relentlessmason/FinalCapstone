package com.techelevator.dao;

import com.techelevator.model.Meal;
import com.techelevator.model.MealPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcMealPlan implements MealPlanDao{

    JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcMealPlan(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public MealPlan[] findAllMealPlans() {
        List<MealPlan> mealPlans = new ArrayList<>();
        String SQL = "SELECT * FROM meal_plan;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(SQL);
        while(results.next()){
            MealPlan mp = mapToRowMealPlan(results);
            mealPlans.add(mp);
        }
        return mealPlans.toArray(new MealPlan[0]);
    }

    @Override
    public MealPlan[] findMealPlanByUserId(Long id) {
        List<MealPlan> mealPlans = new ArrayList<>();
        String SQL = "SELECT * FROM meal_plan mp " +
                "JOIN meal m ON m.meal_id = mp.meal_id " +
                "JOIN meal_account ma ON ma.meal_id = m.meal_id " +
                "WHERE ma.user_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(SQL, id);
        while(results.next()){
            MealPlan mp = mapToRowMealPlan(results);
            mealPlans.add(mp);
        }
        return mealPlans.toArray(new MealPlan[0]);
    }

    @Override
    public void addMealPlan(MealPlan mealPlan) {
        String SQL = "INSERT INTO meal_plan " +
                "(meal_id, " +
                "day_of_week) " +
                "VALUES (?, ?);";

        jdbcTemplate.update(SQL,
                mealPlan.getMealId(),
                mealPlan.getDayOfWeek());
    }

    @Override
    public void deleteMealPlan(Long id) {
        String sql = "DELETE from meal_plan where meal_id = ?;";
        jdbcTemplate.update(sql, id);
    }

    private MealPlan mapToRowMealPlan(SqlRowSet m) {
        MealPlan mp = new MealPlan();
        mp.setMealPlanId(m.getLong("meal_plan_id"));
        mp.setMealId(m.getLong("meal_id"));
        mp.setDayOfWeek(m.getString("day_of_week"));
        return mp;
    }
}