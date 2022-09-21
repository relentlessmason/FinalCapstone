package com.techelevator.controller;

import com.techelevator.dao.PantryDao;
import com.techelevator.model.MealPlan;
import com.techelevator.model.Pantry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class PantryController {

    PantryDao pantryDao;

    @Autowired
    public PantryController(PantryDao pantryDao) {
        this.pantryDao = pantryDao;
    }

    @GetMapping(path = "pantry/")
    public Pantry[] findAllPantryItems() {
        return pantryDao.findAllPantryItems();
    }

    @GetMapping(path = "pantry/user/{id}")
    public Pantry[] findAllPantryItemsByUserId(@PathVariable Long id) {
        return pantryDao.findAllPantryItemsByUserId(id);
    }

    @GetMapping (path = "pantry/{id}")
    public Pantry[] findAllPantryItemsByPantryId(@PathVariable Long id) {
        return pantryDao.findAllPantryItemsByPantryId(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "pantry/")
    public void addToPantry (@Valid @RequestBody Pantry pantry) {
        System.out.println(pantry);
        pantryDao.addToPantry(pantry);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "pantry/{id}")
    public void delete (@PathVariable Long id) {
        pantryDao.deletePantryByPantryId(id);
    }

}
