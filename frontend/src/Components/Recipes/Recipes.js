import React from "react";
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
import IndividualRecipe from "./IndividualRecipe";
import { Link, Redirect } from "react-router-dom";

function RenderRecipeCard({ meal }) {
  if (meal === null || meal == undefined) {
    return <>Nothing to show</>;
  }

  return (
    <>
      {meal.map((m) => {
        return (
          <div className="col-3 m-1 b-1">
            <Card key={m.id} className="border-0">
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
                <div className="col-sm-8 col-lg-6">
                  <Button
                    onClick={() => {
                      //Pop-up Modal to pick a day of the week. Boom done
                      //call props.postMealPlan(m.id,{the input/value from the modal})
                    }}
                    className="submitAR"
                  >
                    Add to Meal Plan
                  </Button>
                </div>
              </Row>
            </Card>
          </div>
        );
      })}
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
          <RenderRecipeCard meal={meal} />
        </div>
      </div>
    </>
  );
};

export default Recipes;
