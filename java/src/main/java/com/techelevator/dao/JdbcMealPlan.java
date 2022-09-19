package com.techelevator.dao;

import com.techelevator.model.Meal;
import com.techelevator.model.MealPlan;
import com.techelevator.model.MealPlanJoin;
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
    public MealPlanJoin[] findMealPlanByUserId(Long id) {
        List<MealPlanJoin> mealPlans = new ArrayList<>();
        String SQL = "select mp.meal_plan_id, m.meal_name, m.meal_id, mp.day_of_week, tod.time_of_day_desc, tod.time_of_day_id, ct.category_type_desc, ct.category_id from meal_plan mp " +
                "JOIN meal m ON m.meal_id=mp.meal_id " +
                "JOIN meal_account ma ON ma.meal_id=m.meal_id " +
                "JOIN time_of_day tod ON tod.time_of_day_id=m.time_of_day_id " +
                "JOIN category_type ct ON ct.category_id=m.category_id "+
                "WHERE ma.user_id=? " +
                "ORDER BY m.time_of_day_id;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(SQL, id);
        while(results.next()){
            MealPlanJoin mp = mapToRowMealPlanJoin(results);
            mealPlans.add(mp);
        }
        return mealPlans.toArray(new MealPlanJoin[0]);
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
        String sql = "DELETE from meal_plan where meal_plan_id = ?;";
        jdbcTemplate.update(sql, id);
    }

    public void updateMealPlan(Long id, MealPlan mealPlan) {
        String sql = "UPDATE meal_plan " +
                "SET meal_id = ?, " +
                "day_of_week = ? " +
                "WHERE meal_plan_id = ?;";
        jdbcTemplate.update(sql,
                mealPlan.getMealId(),
                mealPlan.getDayOfWeek(),
                id);
    }

    private MealPlan mapToRowMealPlan(SqlRowSet m) {
        MealPlan mp = new MealPlan();
        mp.setMealPlanId(m.getLong("meal_plan_id"));
        mp.setMealId(m.getLong("meal_id"));
        mp.setDayOfWeek(m.getString("day_of_week"));
        return mp;
    }

    private MealPlanJoin mapToRowMealPlanJoin(SqlRowSet m) {
        MealPlanJoin mp = new MealPlanJoin();
        mp.setCategoryTypeId(m.getLong("category_id"));
        mp.setTimeOfDayId(m.getLong("time_of_day_id"));
        mp.setMealPlanId(m.getLong("meal_plan_id"));
        mp.setCategoryTypeDesc(m.getString("category_type_desc"));
        mp.setMealName(m.getString("meal_name"));
        mp.setMealId(m.getLong("meal_id"));
        mp.setDayOfWeek(m.getString("day_of_week"));
        mp.setTimeOfDay(m.getString("time_of_day_desc"));
        return mp;
    }
}
