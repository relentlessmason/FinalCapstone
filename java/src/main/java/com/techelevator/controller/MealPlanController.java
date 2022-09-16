package com.techelevator.controller;

import com.techelevator.dao.MealPlanDao;
import com.techelevator.model.Meal;
import com.techelevator.model.MealPlan;
import com.techelevator.model.MealPlanJoin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@PreAuthorize("hasAnyRole('USER','ADMIN')")
public class MealPlanController {

    MealPlanDao mealPlanDao;

    @Autowired
    public MealPlanController(MealPlanDao mealPlanDao) {
        this.mealPlanDao = mealPlanDao;
    }

    @GetMapping(path = "mealplans/")
    public MealPlan[] findAllMealPlans(){
        return mealPlanDao.findAllMealPlans();
    }

    @GetMapping(path = "mealplans/{id}")
    public MealPlanJoin[] findAllMealPlansByUserId(@PathVariable Long id){
        return mealPlanDao.findMealPlanByUserId(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "mealplan/")
    public void addMealPlan(@Valid @RequestBody MealPlan mealPlan){
        mealPlanDao.addMealPlan(mealPlan);
    };

    @PutMapping(path="/updatemealplan/{id}")
    public void updateMealPlan(@Valid @RequestBody MealPlan mealPlan, @PathVariable Long id){
        mealPlanDao.updateMealPlan(id, mealPlan);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "mealplan/{id}")
    public void delete(@PathVariable Long id) {
        mealPlanDao.deleteMealPlan(id);
    }


}
