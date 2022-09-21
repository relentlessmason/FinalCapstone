import React, { useState } from "react";
import banner from "../Recipes/onigiri-neko-cat-pinkbg.png";
import "./Carousel.css";
import breakfast from "./breakfast.png";
import dumpling from "./dumpling.png";
import dinner from "./dinner.png";
import lunch from "./rice.png";
import snack from "./snack.png";
import dessert from "./dessert.png";
import sushi from "./sushi.png";
import fishcake from "./fishcake.png";
import sushiwrap from "./sushi-wrap.png";
import breakfastbento from "./breakfast-bento.png";

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
            <button
              onClick={() => {
                toggleModal();
              }}
              type="submit"
              value="submit"
              className="mt-2 submitAR"
            >
              Submit
            </button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </>
  );
}

function RenderBlank(day) {
  return (
    <Carousel.Item>
      
      <div className="today m-4">
        <p className="todayp">
          <small>
            <img className="center" src={dumpling} alt="" />
          </small>
          {day+" meals"}
        </p>
      </div>
        

      <div id="test" class="text-center pt-1  m-3">
        <h2 className="todayb">
          <small>
            <img src={sushi} alt="" />
            {"   "}</small>
          no plans yet
          <small>{"   "}
            <img className="imagez" src={sushiwrap} alt="" />
          </small>
        </h2>

        <div class="todayp">
          <Link to="/recipes" className="text-decoration-none">
            <button className="mealPlan">View Recipes</button>
          </Link>
        </div>
      </div>
      <br />
      <br />
    </Carousel.Item>
  );
}

function RenderCarouselCard(dayOfWeek, props, day) {
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function timeOfDay(tod) {
    if (tod == "Breakfast") {
      return breakfast;
    }
    if (tod == "Lunch") {
      return lunch;
    }
    if (tod == "Dinner") {
      return dinner;
    }
    if (tod === "Snack") {
      return snack;
    } else return dessert;
  }

  
  return (
    <Carousel.Item >
      
      <div className="today m-4">
        <p className="todayp">
          <small>
            <img className="center" src={dumpling} alt="" />
          </small>
          {day+" meals"}
        </p>
      </div>  

      {dayOfWeek.map((m, i) => {
        return (
          <>
            <div id="test" class="text-center pt-1  m-3" key={i}>
              <div class="row ">
                <div class="col-md-2">
                  <small>
                    <img
                      className="imagez"
                      src={timeOfDay(m.timeOfDay)}
                      alt="time of day image"
                    />
                  </small>
                </div>
                <div class="col-md-8 ">
                  <div class="eight">
                    <h1 className="carouselname ">{m.mealName}</h1>
                  </div>
                </div>
                <div class="col-md-2">
                  <small>
                    <img
                      className="imagez"
                      src={timeOfDay(m.timeOfDay)}
                      alt="time of day image"
                    />
                  </small>
                </div>

                <div className="button-divs">
                  <div className="inner-button-divs">
                    <button
                      className="mealPlan"
                      onClick={() => {
                        props.handleDeleteMealPlans(m.mealPlanId);
                      }}
                    >
                      Remove
                    </button>

                    <Link
                      id="buttonz"
                      to={"/recipe/" + m.mealId}
                      className="text-decoration-none"
                    >
                      <button className="mealPlan">View Recipe</button>
                    </Link>
                    <button
                      id="buttonz"
                      onClick={() => {
                        toggleModal();
                      }}
                      className="mealPlan"
                    >
                      Edit Meal Plan
                    </button>
                    <RenderEditMealPlanModal
                      mealId={m.mealId}
                      mealPlanId={m.mealPlanId}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      props={props}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <br />
      <br />
    </Carousel.Item>
  )
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
    <>
      <Carousel>
        {monday.length !== 0
          ? RenderCarouselCard(monday, props, 'Monday')
          : RenderBlank('Monday')}

        {tuesday.length 
          ? RenderCarouselCard(tuesday, props,"Tuesday")
          : RenderBlank("Tuesday")}

        {wednesday.length !== 0
          ? RenderCarouselCard(wednesday, props,'Wednesday')
          : RenderBlank('Wednesday')}

        {thursday.length !== 0
          ? RenderCarouselCard(thursday, props,'Thursday')
          : RenderBlank('Thursday')}

        {friday.length !== 0
          ? RenderCarouselCard(friday, props,'Friday')
          : RenderBlank('Friday')}

        {saturday.length !== 0
          ? RenderCarouselCard(saturday, props,'Saturday')
          : RenderBlank('Saturday')}

        {sunday.length !== 0
          ? RenderCarouselCard(sunday, props, 'Sunday')
          : RenderBlank('Sunday')}

      </Carousel>
      <img class="card-img-top catimage" src={banner} alt="Card image cap" />
    </>
  );
}
