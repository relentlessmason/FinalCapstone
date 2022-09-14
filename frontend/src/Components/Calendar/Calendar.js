import React, { useState } from "react";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import {
    Card,
    CardImg,
    CardText,
    CardSubtitle,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    Row,
    Label,
    Col,
  } from "reactstrap";
  import { Control, LocalForm, Errors } from "react-redux-form";


export default function CalendarBuild() {

  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  
  const newMealPlan = (mealId, dayOfWeek)=> [{
    mealId: mealId,
    dayOfWeek: dayOfWeek
  }];


  const [newEvent, setNewEvent] = useState({ mealId: "", dayOfWeek: ""});
  const [allEvents, setAllEvents] = useState(newMealPlan);

  function handleAddEvent(values) {
    alert(values)
   }

  return (
    <>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Pick Recipe"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.mealId}
          onChange={(e) => setNewEvent({ ...newEvent, mealId: e.target.value })}
        />
        <DatePicker
          placeholderText="Pick Day"
          style={{ marginRight: "10px" }}
          selected={newEvent.dayOfWeek}
          onChange={(dayOfWeek) => setNewEvent({ ...newEvent, dayOfWeek })}
        />
        <button stlye={{ marginTop: "10px" }} 
        onSubmit={(values) => 
          handleAddEvent(values)}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        style={{ height: 500, margin: "50px" }}
      />
    </>
  );
}