package com.techelevator.controller;

import com.techelevator.dao.MealAccountDao;
import com.techelevator.dao.MealDao;
import com.techelevator.dao.MealIngredientsDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Meal;
import com.techelevator.model.MealAccount;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("hasRole('USER')")
public class MealController {

    private MealDao mealDao;
    private MealAccountDao mealAccountDao;
    private UserDao userDao;
    private MealIngredientsDao mealIngredientsDao;

    @Autowired
    public MealController(MealDao mealDao, MealAccountDao mealAccountDao, UserDao userDao, MealIngredientsDao mealIngredientsDao) {
        this.mealDao = mealDao;
        this.mealAccountDao = mealAccountDao;
        this.userDao=userDao;
        this.mealIngredientsDao =mealIngredientsDao;
    }

    //CURRENTLY IN USE//

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping(path = "meals/")
    public Meal[] findAllAccounts(){
        return mealDao.findAllMeals();
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping(path = "meals/{id}")
    public Meal[] findAllMealsById(@PathVariable Long id){
        return mealDao.findAllMealsByUserId(id);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping(path = "meal/{id}")
    public Meal findMealById(@PathVariable Long id){
        return mealDao.getMealById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "meals/{id}")
    public void addMeal(@Valid @RequestBody Meal meal, @PathVariable Long id){
        Long mealId =  mealDao.addMeal(meal);
        mealAccountDao.addMealAccount(mealId,id);
    };



    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "meals/{id}")
    public void delete(@PathVariable Long id) {
        mealAccountDao.deleteMealAccount(id);
        mealDao.deleteMeal(id);
    }

    @PutMapping(path="/meal/{id}")
    public void updateMeal(@Valid @RequestBody Meal meal, @PathVariable Long id){
        mealDao.updateMeal(id, meal);
    }


    // NOT CURRENTLY USED !! //



    @GetMapping(path="user/{id}")
    public List<User> findAllUsers(@PathVariable Long id){
        return userDao.findAllTEST(id);
    }

    @GetMapping(path = "mealaccount/{id}")
    public MealAccount findAccountById(@PathVariable Long id){
        return mealAccountDao.getAccountById(id);
    }

    @GetMapping(path="mealaccounts/")
    public MealAccount[] findAllMealAccounts(){
        return mealAccountDao.findAllAccounts();
    }

    @GetMapping(path="meal/")
    public Long findMealIdByMealName(@RequestParam(value="mealName") String mealName){
        return mealDao.findIdByMealName(mealName);
    }

    //    @ResponseStatus(HttpStatus.NO_CONTENT)
//    @DeleteMapping(path = "mealaccount/{id}")
//    public void deleteMealAccount(@PathVariable Long id) {
//        mealAccountDao.deleteMealAccount(id);
//    }

    //    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping(path = "mealaccount/")
//    public void addMealAccount(@RequestParam(value = "mealId") Long mealId,
//                                @RequestParam(value = "userId") Long userId){
//        mealAccountDao.addMealAccount(mealId, userId);
//    };

//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping(path = "mealaccount/{mealId}/{userId}")
//    public void addMealAccount(@PathVariable("mealId") Long mealId,
//                               @PathVariable("userId") Long userId){
//        mealAccountDao.addMealAccount(mealId, userId);
//    };


}

