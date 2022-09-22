package com.techelevator.dao;


import com.techelevator.model.Pantry;
public interface PantryDao {

    Pantry[] findAllPantryItems();

    Pantry[] findAllPantryItemsByUserId(Long id);

    void deletePantryByPantryId (Long id);

    public void addToPantry (Pantry pantry, Long id);

    Pantry[] findAllPantryItemsByPantryId(Long id);
}
