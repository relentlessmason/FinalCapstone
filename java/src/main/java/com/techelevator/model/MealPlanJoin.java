package com.techelevator.model;

public class MealPlanJoin {
    private String mealName;
    private Long mealId;
    private String dayOfWeek;
    private String timeOfDay;

    public MealPlanJoin() {
    }

    public MealPlanJoin(String mealName, Long mealId, String dayOfWeek, String timeOfDay) {
        this.mealName = mealName;
        this.mealId = mealId;
        this.dayOfWeek = dayOfWeek;
        this.timeOfDay = timeOfDay;
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
