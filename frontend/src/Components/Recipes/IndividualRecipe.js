import { withRouter, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
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
import React, { Component, useState, useEffect } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import axios from "axios";

class IndividualRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meal: null,
      isModalOpen: false,
      isEditModalOpen: false,
    };
    
  }

  

  handleDelete = this.handleDelete.bind(this);

  // componentDidMount() {
  //   let id = this.props.match.params.id;


  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ` + localStorage.getItem("token"),
  //   };

  //   axios
  //     .get("http://localhost:8081/meal/" + id, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       this.setState({
  //         meal: response.data,
  //       });
  //       console.log(response);
  //     });

  // }

  handleDelete() {
    this.props.deleteMealPlan(this.props.onemeal.id);
    this.props.deleteMeals(this.props.onemeal.id);
    
  }

  render() {


    console.log("One Meal "+this.props.onemeal.mealName)

    
    const post = this.props.onemeal ? (
      <>
        <div className="container">
          <div className="row  justify-content-center">
            <Card className="col-md-6 col-xl-4 col-sm-4 text-lowercase">
              <CardHeader className="text-muted"></CardHeader>
              <CardTitle className="h3">{this.props.onemeal.mealName}</CardTitle>

              <CardBody className="text-center">
                {this.props.onemeal.description}
                <CardText>{this.props.onemeal.ingredients}</CardText>

                <CardText>
                  <br />
                  {this.props.onemeal.recipe}
                </CardText>
              </CardBody>

              <div className="row text-center ">
                <RenderEditModal
                  mealId={this.props.onemeal.id}
                  meal={this.props.onemeal}
                  updateMeal={this.props.updateMeal}
                  handleEditSubmit={this.handleEditSubmit}
                  fetchMealsByUser={this.props.fetchMealsByUser}
                  userId={this.props.userId}
                  params={this.props.onemeal.id}
                />

                <RenderMealPlanModal
                  postMealPlan={this.props.postMealPlan}
                  meal={this.props.onemeal}
                />
                <Link className="text-decoration-none col-4" to="/recipes">
                  <Button
                    onClick={(e) => {
                      // this.props.fetchMealsByUser(this.props.userId);
                    }}
                    className="submitAR "
                  >
                    Return To Recipes
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <Link
            to="/recipes"
            className="col-2 text-decoration-none"
            onClick={() => {
              this.handleDelete();
              // this.props.fetchMealsByUser(this.props.userId);
            }}
          >
            <Button className="submitAR bg-danger">Delete</Button>
          </Link>
        </div>
      </>
    ) : (
      <>
        <Button
          onClick={(e) => {
            // this.props.fetchMealsByUser(this.props.userId);
            this.props.history.push("/recipes");
          }}
          className="submitAR"
        >
          Recipe Deleted
        </Button>
      </>
    );

    return <>{post}</>;
  }
}

function RenderEditModal({
  meal,
  mealId,
  updateMeal,
  fetchMealsByUser,
  userId,
  params,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  handleEditSubmit = handleEditSubmit.bind(this);

  function toggleModal() {
    setIsEditModalOpen(!isEditModalOpen);
  }

  async function handleEditSubmit(values) {

    //update isn't naturally reflecting state
   await updateMeal(
      params,
      values.mealName,
      values.categoryId,
      values.timeOfDayId,
      values.description,
      values.recipe,
      values.ingredients
    );

    toggleModal();

    await fetchMealsByUser(userId);

  }
  return (
    <>
      <Button
        onClick={() => {
          toggleModal();
        }}
        className="submitAR col-3 "
      >
        Edit
      </Button>

      <Modal isOpen={isEditModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Update Recipe Below</ModalHeader>

        <ModalBody>
          <LocalForm id="form" onSubmit={(values) => handleEditSubmit(values)}>
            <Row className="form-group  ">
              <Label htmlFor="mealName">Update Recipe Name</Label>
              <Control.text
                className="form-control"
                model=".mealName"
                id="mealName"
                name="Recipe Name"
                placeholder={meal.mealName}
              />
            </Row>

            <Row className="form-group ">
              <Label htmlFor="description" md={12}>
                Update Description
              </Label>
              <Col md={12} className="">
                <Control.textarea
                  model=".description"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder={meal.description}
                  rows="2"
                />
              </Col>
            </Row>

            <Row className="form-group ">
              <Label htmlFor="timeOfDayId">Update Time of Day</Label>
              <div className="">
                <Control.select
                  md={6}
                  id="selectBox"
                  name="timeOfDay"
                  model=".timeOfDayId"
                  className="form-control "
                  required
                >
                  <option disabled="disabled" selected="true" value="0">
                    Please make a selection..
                  </option>
                  <option value="1">Breakfast</option>
                  <option value="2">Lunch</option>
                  <option value="3">Snack</option>
                  <option value="4">Dinner</option>
                  <option value="5">Dessert</option>
                </Control.select>
              </div>

              <Label htmlFor="categoryId">Update Category</Label>

              <div className="">
                <Control.select
                  md={6}
                  model=".categoryId"
                  id="selectBox"
                  name="categoryId"
                  required
                  className="form-control "
                >
                  <option disabled="disabled" selected="true" value="0">
                    Please make a selection..
                  </option>
                  <option value="1">Vegetarian</option>
                  <option value="2">Meat Lovers</option>
                  <option value="3">Gluten-Free</option>
                  <option value="4">Mexican</option>
                  <option value="5">Chinese</option>
                  <option value="6">Indian</option>
                  <option value="7">Other</option>
                </Control.select>
              </div>
            </Row>

            <Row className="form-group ">
              <Label htmlFor="ingredients" md={12}>
                Update Ingredients
              </Label>
              <Col md={12} className="input-group">
                <Control.textarea
                  model=".ingredients"
                  id="ingredients"
                  className="form-control"
                  type="textarea"
                  name="ingredient"
                  placeholder={meal.ingredients}
                  rows="4"
                />
              </Col>
            </Row>

            <Row className="form-group wrapperAR ">
              <Label htmlFor="recipe" md={12}>
                Update How It's Made
              </Label>
              <Col md={6} className="">
                <Control.textarea
                  model=".recipe"
                  id="recipe"
                  className="form-control text-wrap"
                  type="textarea"
                  name="recipe"
                  placeholder={meal.recipe}
                  rows="4"
                />
              </Col>
            </Row>
            <Button
              onClick={() => {
                // fetchMealsByUser(userId);
              }}
              className="submitAR"
              type="submit"
            >
              Submit
            </Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </>
  );
}

function RenderMealPlanModal({ meal, postMealPlan }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  handleSubmit = handleSubmit.bind(this);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleSubmit(values) {
    postMealPlan(meal.id, values.dayOfWeek);
  }

  return (
    <>
      <Button
        onClick={() => {
          toggleModal();
        }}
        className="submitAR col-3 "
      >
        Add To Meal Plan
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

export default withRouter(IndividualRecipe);
