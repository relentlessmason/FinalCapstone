package com.techelevator.dao;

import com.techelevator.model.Meal;
import com.techelevator.model.MealAccount;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcMealAccount implements MealAccountDao{

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcMealAccount(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public MealAccount[] findAllAccounts() {
        List<MealAccount> mealAccounts = new ArrayList<>();
        String sql = "select * from meal_account;";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            MealAccount mealAccount = mapToRowMealAccount(results);
            mealAccounts.add(mealAccount);
        }

        return mealAccounts.toArray(new MealAccount[0]);
    }

    @Override
    public void addMealAccount(Long mealId, Long userId) {
        String SQL = "INSERT INTO meal_account" +
                " (meal_id, " +
                "user_id) "+
                "VALUES (?, ?);";

        jdbcTemplate.update(SQL, mealId, userId);
    }

    @Override
    public MealAccount getAccountById(Long accountId) {
        String sql = "SELECT * FROM meal_account WHERE user_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, accountId);
        if(results.next()) {
            return mapToRowMealAccount(results);
        } else {
            throw new RuntimeException("userId "+accountId+" was not found.");
        }
    }

    @Override
    public boolean deleteMealAccount(Long id) {
        String sql = "DELETE from meal_account where meal_id = ?;";
        return jdbcTemplate.update(sql, id) == 1;
    }


    private MealAccount mapToRowMealAccount(SqlRowSet results) {
        MealAccount mealAccounts = new MealAccount();
        mealAccounts.setMealId(results.getLong("meal_id"));
        mealAccounts.setUserId(results.getLong("user_id"));
        return mealAccounts;
    }
}
