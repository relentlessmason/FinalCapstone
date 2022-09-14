import React, { useState, useEffect } from "react";
import placeholder from "./Plain_onigiri.png";
import "./AddRecipe.css";
import { Control, LocalForm } from "react-redux-form";
import { Label, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

function resetForm() {
  const form = document.getElementById("form");
  //   const selectBoxes = document.getElementById("selectBox");
  form.reset();
  //   selectBoxes.selectedIndex = 4;
}

async function handleSubmit(values, { user, postMeal, props }) {
  await postMeal(
    values.mealName,
    values.categoryId,
    values.timeOfDayId,
    values.description,
    values.recipe,
    values.ingredients,
    user
  );

  resetForm();
}

export default function AddRecipe(props) {
  let user = props.user.id;
  let postMeal = props.postMeal;
  let userId = props.userId;
  let fetchMealsByUser = props.fetchMealsByUser;

  return (
    <LocalForm
      id="form"
      onSubmit={(values) => handleSubmit(values, { user, postMeal, props })}
    >
      <div className="wrapperAR">
        <div className="leftWrapper">
          <div className="RecipeImgDiv">
            <p>
              <img
                src={placeholder} //generic image
                className="recipeImg"
              />
            </p>
          </div>
          <br />
          <div className="ingredients ">
            <Row className="form-group ">
              <Label htmlFor="ingredients" md={12}>
                Ingredient List
              </Label>
              <Col md={12} className="input-group">
                <Control.textarea
                  model=".ingredients"
                  id="ingredients"
                  className="form-control"
                  type="textarea"
                  name="ingredient"
                  placeholder="'1/2 cup Sugar,
                  2 cups Flour..'"
                  rows="6"
                />
              </Col>
            </Row>

            <Button
              onClick={(e) => {
                e.preventDefault();
                //not sure how to gather multiple input fields and put them into db yet
              }}
              className="submitAR"
              type="submit"
            >
              Add Ingredients
            </Button>
          </div>
        </div>

        <div className="recipeFormHeaderDiv">
          <Label htmlFor="mealName">Recipe Name</Label>
          <Control.text
            className="form-control"
            model=".mealName"
            id="mealName"
            name="Recipe Name"
            placeholder="Recipe Name"
          />

          <Label htmlFor="timeOfDayId">T. O. D.</Label>
          <Control.select
            id="selectBox"
            name="timeOfDay"
            model=".timeOfDayId"
            className="TimeOfDay form-control "
            required
          >
            <option disabled="disabled" selected="true" value="0">
              When do you plan to...eat this
            </option>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Snack</option>
            <option value="4">Dinner</option>
            <option value="5">Dessert</option>
          </Control.select>

          <Label htmlFor="categoryId">Categories</Label>
          <Control.select
            model=".categoryId"
            id="selectBox"
            name="categoryId"
            required
            className="TimeOfDay form-control"
          >
            <option
              disabled="disabled"
              selected="true"
              placeholder="Please"
              value="0"
            >
              Please Select a Category
            </option>
            <option value="1">Vegetarian</option>
            <option value="2">Meat Lovers</option>
            <option value="3">Gluten-Free</option>
            <option value="4">Mexican</option>
            <option value="5">Chinese</option>
            <option value="6">Indian</option>
            <option value="7">Other</option>
          </Control.select>

          <Label htmlFor="description">Tell us about it!</Label>
          {/* //not sure how to gather multiple input fields and put them into db yet */}
          <Control.textarea
            model=".description"
            className="form-control"
            id="description"
            name="description"
            placeholder="'Grandma's goulash recipe. Her secret was human me ...'"
            rows="4"
          />

          <div className="row text-center">
            <Button className="submitAR col-6" type="submit">
              Submit
            </Button>
            <Link
              onClick={() => {
                fetchMealsByUser(userId);
              }}
              className="col-6 text-decoration-none"
              to="/recipes"
            >
              <Button className="submitAR">View Recipes</Button>
            </Link>
          </div>
        </div>
      </div>

      <br />
      <div className="wrapperAR">
        <div className="recipeInstructions">
          <Row className="form-group ">
            <Label htmlFor="recipe" md={12}>
              Tell us how you make it!
            </Label>
            <Col md={2} className="">
              <Control.textarea
                model=".recipe"
                id="recipe"
                className="form-control text-wrap"
                type="textarea"
                name="recipe"
                placeholder="'...when the jous is ready, it's time for the cheese...'"
                rows="8"
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className="spacer"> .</div>
    </LocalForm>
  );
}

{
  /* <h4>
            <strong>We Need Directions...</strong>
          </h4>
          First:
          <textarea name="recipeInstructions" placeholder="Step One" />
          And then...
          <textarea name="recipeInstructions" placeholder="Step Two" />
          And then...
          <textarea name="recipeInstructions" placeholder="Step Three" />
          And then...
          <textarea name="recipeInstructions" placeholder="Step Four" />
          And then...
          <textarea name="recipeInstructions" placeholder="Step Five" />
          And then...
          <textarea name="recipeInstructions" placeholder="Step Six" />
          <button className="submitAR" type="button">
            Add Steps
          </button> */
}

// function RenderAddIngredient() {
//     return (
//       <Row className="form-group ">
//         <Label htmlFor="ingredients" md={12}>
//           Ingredient List
//         </Label>
//         <Col md={12} className="input-group">
//           <Control.select
//             model=".MEASUREMENTS-CLASS-HERE"
//             type="select"
//             className="form-select w-100 text-muted"
//             size="3"
//             md={1}
//           >
//             <option disabled="disabled" selected="true">
//               Measurements
//             </option>
//             <option value="1">1/8 tsp</option>
//             <option value="2">1/4 tsp</option>
//             <option value="3">1/2 tsp</option>
//             <option value="4">1 tsp</option>
//             <option value="5">1 TBSP</option>
//           </Control.select>

//           <Control.text
//             model=".ingredients"
//             id="ingredients"
//             className="form-control"
//             type="text"
//             name="ingredient"
//             placeholder="Ingredient 1"
//             rows="12"
//           />
//         </Col>
//       </Row>
//     );
//   }

{
  /* <Control.select
        model=".MEASUREMENTS-CLASS-HERE"
        type="select"
        className="form-select w-100 text-muted"
        size="3"
        md={1}
      >
        <option disabled="disabled" selected="true">
          Measurements
        </option>
        <option value="1">1/8 tsp</option>
        <option value="2">1/4 tsp</option>
        <option value="3">1/2 tsp</option>
        <option value="4">1 tsp</option>
        <option value="5">1 TBSP</option>
      </Control.select> */
}

{
  /* <Control.select
              model=".ingredients"
              type="select"
              className="form-control btn btn-mini"
            >
              <option value="1">1/8 tsp</option>
              <option value="2">1/4 tsp</option>
              <option value="3">1/2 tsp</option>
              <option value="4">1 tsp</option>
              <option value="5">1 TBSP</option>
            </Control.select>
            <input type="text" name="ingredient" placeholder="Ingredient 2" /> */
}
{
  /* <input type="text" name="ingredient" placeholder="Ingredient 3" />
            <input type="text" name="ingredient" placeholder="Ingredient 4" />
            <input type="text" name="ingredient" placeholder="Ingredient 5" />
            <input type="text" name="ingredient" placeholder="Ingredient 6" />
            <input type="text" name="ingredient" placeholder="Ingredient 7" />
             */
}
