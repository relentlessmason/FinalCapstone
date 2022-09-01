package com.techelevator.controller;

import com.techelevator.dao.MealAccountDao;
import com.techelevator.dao.MealDao;
import com.techelevator.model.Meal;
import com.techelevator.model.MealAccount;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("permitAll")
public class MealController {

    private MealDao mealDao;
    private MealAccountDao mealAccountDao;

    public MealController(MealDao mealDao, MealAccountDao mealAccountDao) {
        this.mealDao = mealDao;
        this.mealAccountDao = mealAccountDao;
    }

    @GetMapping(path="mealaccount/")
    public MealAccount[] findAllMealAccounts(){
        return mealAccountDao.findAllAccounts();
    }

    @GetMapping(path = "meals/")
    public Meal[] findAllAccounts(){
        return mealDao.findAllMeals();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "meals/")
    public void allMeal(@Valid @RequestBody Meal meal){
        mealDao.addMeal(meal);
    };

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "meals/{id}")
    public void delete(@PathVariable int id) {
        mealDao.deleteMeal(id);
    }

}

