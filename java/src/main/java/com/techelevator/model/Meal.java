package com.techelevator.model;


import java.util.Arrays;

public class Meal {

    private Long id;
    private String mealName;
    private Long categoryId;
    private Long timeOfDayId;
    private String description;
    private String recipe;
    private String ingredients;

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", mealName='" + mealName + '\'' +
                ", categoryId=" + categoryId +
                ", timeOfDayId=" + timeOfDayId +
                ", description='" + description + '\'' +
                ", recipe='" + recipe + '\'' +
                ", ingredients=" + ingredients +
                '}';
    }

    public Meal() {
    }

    public Meal(Long id,
                String mealName,
                Long categoryId,
                Long timeOfDayId,
                String description,
                String recipe,
                String ingredients) {
        this.id = id;
        this.mealName = mealName;
        this.categoryId = categoryId;
        this.timeOfDayId = timeOfDayId;
        this.description = description;
        this.recipe = recipe;
        this.ingredients = ingredients;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getTimeOfDayId() {
        return timeOfDayId;
    }

    public void setTimeOfDayId(Long timeOfDayId) {
        this.timeOfDayId = timeOfDayId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRecipe() {
        return recipe;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }



}
