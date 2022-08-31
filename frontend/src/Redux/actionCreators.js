import * as ActionTypes from "./actionTypes";
import { baseUrl } from "../Shared/baseUrl";

//ADD TOKEN/USERS
export const addToken = (token) => ({
  type: ActionTypes.ADD_TOKEN,
  payload: token,
});

export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: ActionTypes.DELETE_USER,
});
//END TOKEN/USERS

//***MEALS***//

export const addMeal =  (meal) => ({
  type: ActionTypes.ADD_MEAL,
  payload: meal
});

 export const postMeal = 
  (mealName, categoryId, timeOfDayId, description, recipe, ingredients) =>
  (dispatch) => {
    const newMeal = {
      mealName: mealName,
      categoryId: categoryId,
      timeOfDayId: timeOfDayId,
      description: description,
      recipe: recipe,
      ingredients: ingredients
    };


    return fetch(baseUrl + "/meals/", {
      method: "POST",
      body: JSON.stringify(newMeal),
      headers: {
        "Content-Type": "application/json"
        
      },
      credentials: "same-origin"
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } 
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((response) =>
        alert("Current state is: " + JSON.stringify(response))
      )
      .then((meal) => dispatch(addMeal(meal)))

      .catch((error) => {
        console.log("Post Meal ", error.message);
      });
  };

  

export const fetchMeals = () => async (dispatch) => {
  let auth= localStorage.getItem('token')

  const response = await fetch(baseUrl + "/meals/", {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + auth
    }
  });
  const meal = await response.json();
  return dispatch(addMeals(meal));

  //TODO AFTER ACTION TYPES
  // .catch(error => dispatch(dishesFailed(error.message)));
};

//TODO ADD TO ACTION TYPES
// export const mealsLoading = () => ({
//     type: ActionTypes.MEALS_LOADING
// });

//TODO ADD TO ACTION TYPES
// export const mealsFailed = (errmess) => ({
//     type: ActionTypes.MEALS_FAILED,
//     payload: errmess
// });

export const addMeals = (meal) => ({
  type: ActionTypes.ADD_MEALS,
  payload: meal
});

//***END MEALS***//


