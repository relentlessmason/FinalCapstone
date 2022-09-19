package com.techelevator.model;

public class TimeOfDay {
    private Long timeOfDayId;
    private String timeOfDayDesc;

    public TimeOfDay(Long timeOfDayId, String timeOfDayDesc) {
        this.timeOfDayId = timeOfDayId;
        this.timeOfDayDesc = timeOfDayDesc;
    }

    public TimeOfDay() {
    }

    public Long getTimeOfDayId() {
        return timeOfDayId;
    }

    public void setTimeOfDayId(Long timeOfDayId) {
        this.timeOfDayId = timeOfDayId;
    }

    public String getTimeOfDayDesc() {
        return timeOfDayDesc;
    }

    public void setTimeOfDayDesc(String timeOfDayDesc) {
        this.timeOfDayDesc = timeOfDayDesc;
    }
}
