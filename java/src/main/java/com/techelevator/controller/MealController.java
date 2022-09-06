package com.techelevator.controller;

import com.techelevator.dao.MealAccountDao;
import com.techelevator.dao.MealDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Meal;
import com.techelevator.model.MealAccount;
import com.techelevator.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("hasRole('USER')")
public class MealController {

    private MealDao mealDao;
    private MealAccountDao mealAccountDao;
    private UserDao userDao;

    public MealController(MealDao mealDao, MealAccountDao mealAccountDao, UserDao userDao) {
        this.mealDao = mealDao;
        this.mealAccountDao = mealAccountDao;
        this.userDao=userDao;
    }

    @GetMapping(path="user/{id}")
    public List<User> findAllUsers(@PathVariable Long id){
        return userDao.findAllTEST(id);
    }

    @GetMapping(path="mealaccounts/")
    public MealAccount[] findAllMealAccounts(){
        return mealAccountDao.findAllAccounts();
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping(path = "meals/")
    public Meal[] findAllAccounts(){
        return mealDao.findAllMeals();
    }

    @GetMapping(path = "mealaccount/{id}")
    public MealAccount findAccountById(@PathVariable Long id){
        return mealAccountDao.getAccountById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "meals/")
    public void addMeal(@Valid @RequestBody Meal meal){
        mealDao.addMeal(meal);
    };

//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping(path = "mealaccount/")
//    public void addMealAccount(@RequestParam(value = "mealId") Long mealId,
//                                @RequestParam(value = "userId") Long userId){
//        mealAccountDao.addMealAccount(mealId, userId);
//    };

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "mealaccount/{mealId}/{userId}")
    public void addMealAccount(@PathVariable("mealId") Long mealId,
                               @PathVariable("userId") Long userId){
        mealAccountDao.addMealAccount(mealId, userId);
    };

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "meals/{id}")
    public void delete(@PathVariable int id) {
        mealDao.deleteMeal(id);
    }

}

