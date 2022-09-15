package com.techelevator.dao;

import com.techelevator.model.Pantry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcPantry implements PantryDao {

    JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcPantry(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Pantry[] findAllPantryItems() {
        List<Pantry> pantries = new ArrayList<>();
        String SQL = "SELECT * FROM pantry;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(SQL);
        while(results.next() ){
            Pantry pantry = mapToRowPantry(results);
            pantries.add(pantry);
        }
        return pantries.toArray(new Pantry[0]);
    }

    @Override
    public Pantry[] findAllPantryItemsByUserId(Long id) {
        List<Pantry> pantries = new ArrayList<>();
        String SQL = "SELECT * FROM pantry WHERE user_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(SQL, id);
        while(results.next()) {
            Pantry pantry = mapToRowPantry(results);
            pantries.add(pantry);
        }
        return pantries.toArray(new Pantry[0]);
    }

    @Override
    public Pantry[] findAllPantryItemsByPantryId(Long id) {
        List<Pantry> pantries = new ArrayList<>();
        String SQL = "SELECT * FROM pantry WHERE pantry_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(SQL, id);
        while (results.next()) {
            Pantry pantry = mapToRowPantry(results);
            pantries.add(pantry);
        }
        return pantries.toArray(new Pantry[0]);
    }

    @Override
    public void deletePantryByPantryId (Long id) {
        String SQL = "DELETE FROM pantry WHERE pantry_id = ?; ";
        jdbcTemplate.update(SQL, id);
    }

    @Override
    public void addToPantry (Pantry pantry) {
        System.out.println(pantry);
        String SQL = "INSERT INTO pantry (user_id, ingredients_name, qty)" +
                " values (?, ?, ?);";
        jdbcTemplate.update(SQL,
                pantry.getUserId(),
                pantry.getIngredientsName(),
                pantry.getQty());
    }


    private Pantry mapToRowPantry(SqlRowSet item ) {
        Pantry p = new Pantry();
        p.setPantryId(item.getLong("pantry_id"));
        p.setUserId(item.getLong("user_id"));
        p.setIngredientsName(item.getString("ingredients_name"));
        p.setQty(item.getInt("qty"));

        return p;


    }

}
