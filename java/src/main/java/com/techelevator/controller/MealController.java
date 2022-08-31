package com.techelevator.controller;

import com.techelevator.dao.MealDao;
import com.techelevator.model.Meal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("permitAll")
public class MealController {

    private MealDao mealDao;

    public MealController(MealDao mealDao) {
        this.mealDao = mealDao;
    }

    @GetMapping(path = "meals/")
    public Meal[] findAllAccounts(){
        return mealDao.findAllMeals();
    }

}

