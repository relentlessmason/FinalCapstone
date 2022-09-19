import React, { useState, useEffect } from "react";
import banner from './onigiri-neko-cat.png';
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


function RenderRecipeCard({ meal, postMealPlan, user, fetchMealPlansByUserId }) {
  const [clickedMealId, setClickedMealId] = useState(null);

  if (meal === null || meal == undefined) {
    return (<>Nothing to show</>);
  }

  return (
    <>
      {meal.map((m) => {
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
                <CardTitle className="h3 mt-1 ml-2 text-lowercase">{m.mealName}</CardTitle>
                <CardText id="card-text" className="text-muted text-lowercase">
                  {m.description.length <= 15
                    ? m.description
                    : `${m.description.slice(0, 20)}...`}
                    
                  {/* {m.description} */}
                </CardText>
                <CardSubtitle id="card-text" className="text-lowercase">
                  {m.recipe.length <= 25
                    ? m.recipe
                    : `${m.recipe.slice(0, 50)}...`}

                  {/* {m.recipe} */}
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

function AddMealPlanModal({ postMealPlan, clickedMealId, user,fetchMealPlansByUserId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  async function handleSubmit(values) {
   await postMealPlan(clickedMealId, values.dayOfWeek);
    fetchMealPlansByUserId(user.id)
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
        fetchMealPlansByUserId={props.fetchMealPlansByUserId} 
        user={props.user}
        postMealPlan={props.postMealPlan} 
        meal={props.meal} />
      </div>
      
    </div>
    {/* <img src={banner} alt="onigiri-cat!" className=""/> */}

    </>
  );
};

export default Recipes;
