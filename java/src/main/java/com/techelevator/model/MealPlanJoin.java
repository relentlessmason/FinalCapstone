package com.techelevator.model;

public class MealPlanJoin {
    private Long mealPlanId;
    private Long mealId;
    private String mealName;
    private String dayOfWeek;
    private String timeOfDay;

    public MealPlanJoin() {
    }

    public MealPlanJoin(Long mealPlanId, String mealName, Long mealId, String dayOfWeek, String timeOfDay) {
        this.mealPlanId = mealPlanId;
        this.mealName = mealName;
        this.mealId = mealId;
        this.dayOfWeek = dayOfWeek;
        this.timeOfDay = timeOfDay;
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
