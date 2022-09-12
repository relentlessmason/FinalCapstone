package com.techelevator.model;

import org.springframework.jdbc.support.rowset.SqlRowSet;

public class MealIngredients {

    private static Long mealId;
    private Long ingredientsId;
    private String ingredients_name;
    private static int qty;

    public MealIngredients() { }

    public MealIngredients(Long mealId, Long ingredientsId, String ingredients_name, int qty) {
        this.mealId = mealId;
        this.ingredientsId = ingredientsId;
        this.ingredients_name = ingredients_name;
        this.qty = qty;
    }




    @Override
    public String toString() {
        return "Ingredients{" +
                "mealId" + mealId +
                ", ingredientsId " +
                ", ingredients_name " + ingredients_name +
                ", qty" + qty +
                '}';
    }



    public static Long getMealId() {
        return mealId;
    }

    public Long getIngredientsId() {
        return ingredientsId;
    }

    public void setIngredientsId(Long ingredientsId) {
        this.ingredientsId = ingredientsId;
    }

    public String getIngredients_name() {
        return ingredients_name;
    }

    public void setIngredients_name(String ingredients_name) {
        this.ingredients_name = ingredients_name;
    }

    public static int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }


}
