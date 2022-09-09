package com.techelevator.model;

public class MealPlan {
    private Long mealPlanId;
    private Long mealId;
    private String dayOfWeek;

    public MealPlan(Long mealPlanId, Long mealId, String dayOfWeek) {
        this.mealPlanId = mealPlanId;
        this.mealId = mealId;
        this.dayOfWeek = dayOfWeek;
    }

    @Override
    public String toString() {
        return "MealPlan{" +
                "mealPlanId=" + mealPlanId +
                ", mealId=" + mealId +
                ", dayOfWeek='" + dayOfWeek + '\'' +
                '}';
    }

    public MealPlan() {
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
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
}
