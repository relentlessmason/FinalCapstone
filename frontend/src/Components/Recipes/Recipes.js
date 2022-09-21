import React, { useState, useEffect } from "react";
import banner from "./onigiri-neko-cat.png";
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
import { Link, Redirect, withRouter } from "react-router-dom";
import RandomRecipe from "./RandomRecipe";

function RenderSearchBar({ setSearchByName, setSearchByIngredient }) {
  return (
    <div className="form-group row ">
      <div className="col-xs-2 inputdiv">
        <input
          className="inputfield"
          type="text"
          placeholder="Search by..."
          onChange={(e) => {
            setSearchByName(e.target.value);
            setSearchByIngredient(e.target.value);
          }}
        />{" "}
      </div>
    </div>
  );
}

function RenderRecipeCard({
  meal,
  postMealPlan,
  user,
  fetchMealPlansByUserId,
  mealPlan,
  handlePostMealPlan,
}) {
  const [clickedMealId, setClickedMealId] = useState(null);
  const [searchByName, setSearchByName] = useState("");
  const [searchByIngredient, setSearchByIngredient] = useState(null);

  if (meal === null || meal == undefined) {
    return <>Nothing to show</>;
  }

  return (
    <>
      <RenderSearchBar
        setSearchByName={setSearchByName}
        setSearchByIngredient={setSearchByIngredient}
      />
      {meal
        .filter((m) => {
          if (searchByName == "") {
            return m;
          } else if (m.mealName.toLowerCase().includes(searchByName)) {
            return m;
          } else if (m.ingredients.toLowerCase().includes(searchByIngredient)) {
            return m;
          }
        })
        .map((m) => {
          return (
            <div className="col-4 mt-2">
              <Card
                onClick={() => {
                  setClickedMealId(m.id);
                }}
                key={m.id}
                className="border-0"
              >
                <CardBody className="text-center">
                  <CardTitle className="h3 mt-1 ml-2 text-lowercase">
                    {m.mealName.length <= 15
                      ? m.mealName
                      : `${m.mealName.slice(0, 18)}...`}
                  </CardTitle>
                  <CardText
                    id="card-text"
                    className="text-muted text-lowercase"
                  >
                    '
                    {m.description.length <= 15
                      ? m.description
                      : `${m.description.slice(0, 25)}...`}
                    '
                  </CardText>
                  <CardSubtitle id="card-text" className="text-lowercase">
                    {m.recipe.length <= 25
                      ? m.recipe
                      : `${m.recipe.slice(0, 50)}...`}
                  </CardSubtitle>
                </CardBody>

                <Row className="row ">
                  <div className="col-sm-4 col-lg-6">
                    <Link
                      onClick={() => {
                        setClickedMealId(m.id);
                      }}
                      to={"/recipe/" + m.id}
                      className="text-decoration-none"
                    >
                      <Button className="submitAR ">View Recipe</Button>
                    </Link>
                  </div>
                  <div className="col-sm-8 col-lg-6">
                    <AddMealPlanModal
                    handlePostMealPlan={handlePostMealPlan}
                      fetchMealPlansByUserId={fetchMealPlansByUserId}
                      user={user}
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

function AddMealPlanModal({
  postMealPlan,
  clickedMealId,
  user,
  fetchMealPlansByUserId,
  handlePostMealPlan
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  // async function handleSubmit(values) {
  //   await postMealPlan(clickedMealId, values.dayOfWeek);
  //   fetchMealPlansByUserId(user.id);
  // }


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
          <LocalForm onSubmit={(values) => handlePostMealPlan(values,clickedMealId)}>
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

const Recipes = (props) => {
  return (
    <>
      <div className="container-lg">
        <Link to="/add-recipe" className="text-decoration-none">
          <Button className="submitAR">Click to add a new Recipe</Button>
        </Link>
        <br />
        <div className="row my-5 align-items-center">
          <RenderRecipeCard
            handlePostMealPlan={props.handlePostMealPlan}
            fetchMealPlansByUserId={props.fetchMealPlansByUserId}
            user={props.user}
            postMealPlan={props.postMealPlan}
            meal={props.meal}
            mealPlan={props.mealPlan}
          />
        </div>
      </div>
    </>
  );
};

export default Recipes;
