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
    <div className="reducer">
    <Link to="/add-recipe" className="text-decoration-none ">
          <button className="submit buttonzz mb-1">Add a Recipe</button>
        </Link>
    <div className="form-group  ">

        <input
          className="inputdiv col-2 "
          type="text"
          placeholder=" search..."
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
  searchByIngredient,
  searchByName
}) {
  const [clickedMealId, setClickedMealId] = useState(null);
 

  if (meal === null || meal == undefined) {
    return <>Nothing to show</>;
  }

  return (
    <>
      
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
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-2 ">
              <Card
                onClick={() => {
                  setClickedMealId(m.id);
                }}
                key={m.id}
                className=" recipe "
              >
                <CardBody className="  ">
                  <CardTitle className="recipeheader ">
                    {m.mealName.length <= 15
                      ? m.mealName
                      : `${m.mealName.slice(0, 13)}..`}
                  </CardTitle>
                  <CardText
                    id="card-text"
                    className="recipeb"
                  >
                    {m.description.length <= 15
                      ? m.description
                      : `${m.description.slice(0, 40)}...`}
                       </CardText>

                  <CardSubtitle className="recipebody ">
                  {m.recipe.length <= 25
                    ? m.recipe
                    : `${m.recipe.slice(0, 75)}...`}

                  <div className="row buttonzz">
                    <div className="col-6  ">
                      <Link
                        onClick={() => {
                          setClickedMealId(m.id);
                        }}
                        to={"/recipe/" + m.id}
                        className="text-decoration-none "
                      >
                        <button className="submit">View Recipe</button>
                      </Link>
                    </div>
                    <div className="col-6 ">
                      <AddMealPlanModal
                        handlePostMealPlan={handlePostMealPlan}
                        fetchMealPlansByUserId={fetchMealPlansByUserId}
                        user={user}
                        postMealPlan={postMealPlan}
                        clickedMealId={clickedMealId}
                      />
                    </div>
                  </div>
                  </CardSubtitle>
                </CardBody>
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
  handlePostMealPlan,
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
      <button
        onClick={() => {
          toggleModal();
        }}
        type="submit"
        className="submit "
      >
        Add to Plan
      </button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Choose a day of the week</ModalHeader>

        <ModalBody>
          <LocalForm
            onSubmit={(values) => handlePostMealPlan(values, clickedMealId)}
          >
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
              className="mt-2 submit"
            >
              Submit
            </button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </>
  );
}

const Recipes = (props) => {
  const [searchByName, setSearchByName] = useState("");
  const [searchByIngredient, setSearchByIngredient] = useState(null);

  return (
    <>
      <div className="row">
        <RenderSearchBar
        setSearchByName={setSearchByName}
        setSearchByIngredient={setSearchByIngredient}
      />
     

        <br />
        <div className="row align-items-center">
          <RenderRecipeCard
          searchByName={searchByName}
          searchByIngredient={searchByIngredient}
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
