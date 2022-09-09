package com.techelevator.dao;
import com.techelevator.model.MealIngredients;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;



public interface MealIngredientsDao  {
    MealIngredients[] findAllIngredients();



}
