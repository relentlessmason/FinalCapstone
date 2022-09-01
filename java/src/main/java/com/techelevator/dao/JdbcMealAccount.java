package com.techelevator.dao;

import com.techelevator.model.Meal;
import com.techelevator.model.MealAccount;
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

    private MealAccount mapToRowMealAccount(SqlRowSet results) {
        MealAccount mealAccounts = new MealAccount();
        mealAccounts.setAccountId(results.getLong("account_id"));
        mealAccounts.setUserId(results.getLong("user_id"));
        return mealAccounts;
    }
}
