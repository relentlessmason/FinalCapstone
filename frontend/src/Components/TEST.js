import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";

const TEST = (props) => {
  function handleSubmit(values) {
    this.props.postMeal(
      values.mealName,
      values.categoryId,
      values.timeOfDayId,
      values.description,
      values.recipe,
      values.ingredients
    );
  }

  function RenderMeals({ meal }) {
    return (
      <div>
        <p>
          <li>{meal.mealName}</li>
          <li>{meal.description}</li>
        </p>
      </div>
    );
  }

  return (
    <>
      <h2>Hello this is our practice page</h2>
      <RenderMeals meal={props.meal} />

      {/* we can use this form to practice input */}

      <Row className="form-group">
        <Label htmlFor="mealName" md={2}>
          Meal Name
        </Label>
        <Col md={10}>
          <Control.text
            model=".mealName"
            className="form-control"
            id="mealName"
            name="mealName"
            placeholder="Meal Name"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="categoryId" md={2}>
          Category Id
        </Label>
        <Col md={10}>
          <Control.text
            model=".categoryId"
            className="form-control"
            id="categoryId"
            name="categoryId"
            placeholder="Category Id"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="timeOfDayId" md={2}>
          Contact Tel.
        </Label>
        <Col md={10}>
          <Control.text
            model=".timeOfDayId"
            className="form-control"
            id="timeOfDayId"
            name="timeOfDayId"
            placeholder="timeOfDayId"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="description" md={2}>
          Description
        </Label>
        <Col md={10}>
          <Control.text
            model=".description"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="recipe" md={2}>
          Recipe
        </Label>
        <Col md={10}>
          <Control.textarea
            type="textarea"
            id="recipe"
            model=".recipe"
            className="form-control"
            rows="5"
          ></Control.textarea>
        </Col>
      </Row>
      <Row className="form-group">
        <Label htmlFor="ingredients" md={2}>
          Ingredients
        </Label>
        <Col md={10}>
          <Control.textarea
            type="textarea"
            id="ingredients"
            model=".ingredients"
            className="form-control"
            rows="5"
          ></Control.textarea>
        </Col>
      </Row>
      <Row className="form-group">
        <Col md={{ size: 10, offset: 2 }}>
          <Button type="submit" color="primary">
            Send Meal
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TEST;
