import React, { useState } from "react";
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
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";

function RenderCarouselCard(dayOfWeek, handleDeletePlan, props) {
  function today() {
    let d = null;
    dayOfWeek.map((day) => {
      d = day.dayOfWeek + " Meals";
    });
    return d;
  }

  return (
    <Carousel.Item>
      <div className="text-center">
        <br />

        <h2>{today()}</h2>
        {dayOfWeek.map((m, i) => {
          return (
            <>
              <Card className=" m-3 p-2 text-center" key={i}>
                <CardTitle>
                  <h3>Meal Name</h3>
                  {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                    {m.timeOfDay}
                  </CardText>
                </CardBody>
                <Button
                  onClick={() => {
                    handleDeletePlan(m.mealId);
                    props.fetchMealPlansByUserId(props.user.id);
                  }}
                >
                  Remove
                </Button>
              </Card>
            </>
          );
        })}
      </div>
    </Carousel.Item>
  );
}

export default function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  let monday = props.mealPlan.mealPlan.filter(
    (meal) => meal.dayOfWeek == "Monday",
    10
  );
  let tuesday = props.mealPlan.mealPlan.filter(
    (meal) => meal.dayOfWeek == "Tuesday",
    10
  );
  let wednesday = props.mealPlan.mealPlan.filter(
    (meal) => meal.dayOfWeek == "Wednesday",
    10
  );
  let thursday = props.mealPlan.mealPlan.filter(
    (meal) => meal.dayOfWeek == "Thursday",
    10
  );
  let friday = props.mealPlan.mealPlan.filter(
    (meal) => meal.dayOfWeek == "Friday",
    10
  );
  let saturday = props.mealPlan.mealPlan.filter(
    (meal) => meal.dayOfWeek == "Saturday",
    10
  );
  let sunday = props.mealPlan.mealPlan.filter(
    (meal) => meal.dayOfWeek == "Sunday",
    10
  );

  // let lunchPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Lunch',10);
  // let snackPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Snack',10);
  // let dinnerPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Dinner',10);
  // let dessertPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Dessert',10);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function handleDeletePlan(e) {
    props.deleteMealPlan(e);
  }

  return (
    <div className="container">
      <Carousel>
        {RenderCarouselCard(monday, handleDeletePlan, props)}

        {RenderCarouselCard(tuesday, handleDeletePlan, props)}

        {RenderCarouselCard(wednesday, handleDeletePlan, props)}

        {RenderCarouselCard(thursday, handleDeletePlan, props)}

        {RenderCarouselCard(friday, handleDeletePlan, props)}

        {RenderCarouselCard(saturday, handleDeletePlan, props)}

        {RenderCarouselCard(sunday, handleDeletePlan, props)}
      </Carousel>
    </div>
  );
}
