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
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Home.css";

function RenderEditMealPlanModal({
  props,
  isModalOpen,
  setIsModalOpen,
  mealId,
  mealPlanId,
}) {
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  async function handleEditSubmit(values) {
    const newMeal = {
      mealPlanId: mealPlanId,
      mealId: mealId,
      dayOfWeek: values.dayOfWeek,
    };

    await props.handleUpdateMealPlans(newMeal);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Choose a day of the week</ModalHeader>

        <ModalBody>
          <LocalForm onSubmit={(values) => handleEditSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="mealPlan" md={2}></Label>
              <Col md={12}>
                <Control.select
                  model=".dayOfWeek"
                  className="form-control"
                  id="dayOfWeek"
                  name="dayOfWeek"
                  required
                >
                  <option
                    value="Please Select"
                    disabled="disabled"
                    selected="true"
                  >
                    Please Select
                  </option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Control.select>
              </Col>
            </Row>
            <Button
              onClick={() => {
                toggleModal();
              }}
              type="submit"
              value="submit"
              className="mt-2 submitAR"
            >
              Submit
            </Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </>
  );
}

function RenderBlank() {
  return (
    <Carousel.Item>
      <div className="text-center ">
        <Link to="/recipes">
          <Button className="submitAR">
            Nothing to display you stupid bitch
          </Button>
        </Link>
      </div>
    </Carousel.Item>
  );
}

function RenderCarouselCard(dayOfWeek, props) {
  function today() {
    let d = null;
    dayOfWeek.map((day) => {
      d = day.dayOfWeek + " Meals";
    });
    return d;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
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
                <div>
                  <Button
                    className="submitAR"
                    onClick={() => {
                      props.handleDeleteMealPlans(m.mealPlanId);
                    }}
                  >
                    Remove
                  </Button>
                  <Link
                    to={"/recipe/" + m.mealId}
                    className="text-decoration-none"
                  >
                    <Button className="submitAR ">View Recipe</Button>
                  </Link>
                  <Button
                    onClick={() => {
                      toggleModal();
                    }}
                    className="submitAR"
                  >
                    Edit Meal Plan
                  </Button>
                  <RenderEditMealPlanModal
                    mealId={m.mealId}
                    mealPlanId={m.mealPlanId}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    props={props}
                  />
                </div>
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


  return (
    <div className="container">
      <Carousel>
        {monday.length !== 0
          ? RenderCarouselCard(monday, props)
          : RenderBlank()}

        {tuesday.length !== 0
          ? RenderCarouselCard(tuesday, props)
          : RenderBlank()}

        {wednesday.length !== 0
          ? RenderCarouselCard(wednesday, props)
          : RenderBlank()}

        {thursday.length !== 0
          ? RenderCarouselCard(thursday, props)
          : RenderBlank()}

        {friday.length !== 0
          ? RenderCarouselCard(friday, props)
          : RenderBlank()}

        {saturday.length !== 0
          ? RenderCarouselCard(saturday, props)
          : RenderBlank()}

        {sunday.length !== 0
          ? RenderCarouselCard(sunday, props)
          : RenderBlank()}
      </Carousel>
    </div>
  );
}
