package com.techelevator.model;

import java.security.PublicKey;

public class Pantry {
    private Long userId;
    private String ingredientsName;
    private Long pantryId;
    private int qty;

    @Override
    public String toString() {
        return "Pantry {" +
                "pantryId = " + pantryId +
                ", userId = " + userId +
                ", ingredientsName =" + ingredientsName +
                ", qty =" + qty + "}";
    }


    public Pantry() {

    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getIngredientsName() {
        System.out.println(ingredientsName);
        return ingredientsName;
    }

    public void setIngredientsName(String ingredientsName) {
       this.ingredientsName = ingredientsName;
    }

    public Long getPantryId() {
        return pantryId;
    }

    public void setPantryId(Long pantryId) {
        this.pantryId = pantryId;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
