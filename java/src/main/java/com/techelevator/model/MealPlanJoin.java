package com.techelevator.model;

public class MealPlanJoin {
    private Long mealPlanId;
    private Long mealId;
    private String mealName;
    private String dayOfWeek;
    private String timeOfDay;
    private String categoryTypeDesc;
    private Long categoryTypeId;
    private Long timeOfDayId;

    public MealPlanJoin(Long mealPlanId, Long mealId, String mealName, String dayOfWeek, String timeOfDay, String categoryTypeDesc, Long categoryTypeId, Long timeOfDayId) {
        this.mealPlanId = mealPlanId;
        this.mealId = mealId;
        this.mealName = mealName;
        this.dayOfWeek = dayOfWeek;
        this.timeOfDay = timeOfDay;
        this.categoryTypeDesc = categoryTypeDesc;
        this.categoryTypeId = categoryTypeId;
        this.timeOfDayId = timeOfDayId;
    }

    public MealPlanJoin() {
    }

    public Long getCategoryTypeId() {
        return categoryTypeId;
    }

    public void setCategoryTypeId(Long categoryTypeId) {
        this.categoryTypeId = categoryTypeId;
    }

    public Long getTimeOfDayId() {
        return timeOfDayId;
    }

    public void setTimeOfDayId(Long timeOfDayId) {
        this.timeOfDayId = timeOfDayId;
    }

    public String getCategoryTypeDesc() {
        return categoryTypeDesc;
    }

    public void setCategoryTypeDesc(String categoryTypeDesc) {
        this.categoryTypeDesc = categoryTypeDesc;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getTimeOfDay() {
        return timeOfDay;
    }

    public void setTimeOfDay(String timeOfDay) {
        this.timeOfDay = timeOfDay;
    }
}
