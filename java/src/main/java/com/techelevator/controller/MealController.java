package com.techelevator.controller;

import com.techelevator.dao.MealDao;
import com.techelevator.model.Meal;
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

    public MealController(MealDao mealDao) {
        this.mealDao = mealDao;
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

