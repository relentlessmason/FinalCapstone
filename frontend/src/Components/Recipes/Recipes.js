import React, { useState } from "react";
import "./Recipes.css";
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
import IndividualRecipe from "./IndividualRecipe";
import { Link, Redirect } from "react-router-dom";

function RenderRecipeCard({ meal, postMealPlan }) {
  const [clickedMealId, setClickedMealId] = useState(null);

  if (meal === null || meal == undefined) {
    return <>Nothing to show</>;
  }

  return (
    <>
      {meal.map((m) => {
        return (
          <div className="col-3 m-1 b-1">
            <Card
            onClick={() => {
                setClickedMealId(m.id);
              }}
              key={m.id}
              className="border-0"
            >
              <CardBody className="text-center ">
                <CardTitle className="h3 mt-1 ml-2">{m.mealName}</CardTitle>
                <CardText id="card-text" className="blockquote-footer">
                  {m.description}
                </CardText>
                <CardSubtitle id="card-text" className="text-muted">
                  {m.recipe}
                </CardSubtitle>
              </CardBody>
              <Row className="row ">
                <div className="col-sm-4 col-lg-6">
                  <Button
                    onClick={() => {
                      //this will link us to the <IndividualRecipe/> component
                      //we will pass the value of {m.id} into the path to pull up that page
                    }}
                    className="submitAR"
                  >
                    View Recipe
                  </Button>
                </div>
                <div onClick={() => {}} className="col-sm-8 col-lg-6">
                  <AddMealPlanModal
                    
                    postMealPlan={postMealPlan}
                    clickedMealId={clickedMealId}
                  />
                </div>
              </Row>
            </Card>
          </div>
        );
      })}
    </>
  );
}

function AddMealPlanModal({ postMealPlan, clickedMealId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleSubmit(values) {
    postMealPlan(clickedMealId, values.dayOfWeek);
  }

  return (
    <>
      <Button
        onClick={() => {
          toggleModal();
        }}
        className="submitAR"
      >
        Add to Meal Plan
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Choose a day of the week</ModalHeader>

        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="mealPlan" md={2}>
              </Label>
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

const Recipes = (props) => {
  let meal = props.meal.meal;

  return (
    <>
      <div className="container-lg">
        <Link to="/add-recipe" className="text-decoration-none">
          <Button className="submitAR">Click to add a new Recipe</Button>
        </Link>
        <br />
        <div className="row my-5 align-items-center">
          <RenderRecipeCard postMealPlan={props.postMealPlan} meal={meal} />
        </div>
      </div>
    </>
  );
};

export default Recipes;
