import * as ActionTypes from "./actionTypes";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ` + localStorage.getItem("token"),
};

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

export const deleteMeal = () => ({
  type: ActionTypes.DELETE_MEAL,
});

export const deleteMeals = (id) => async (dispatch) => {
  try {
    const mealToDelete = await axios.delete(baseUrl + "/meals/" + id, {
      headers: headers,
    });
    return await dispatch(deleteMeal(mealToDelete.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const postMeal =
  (
    mealName,
    categoryId,
    timeOfDayId,
    description,
    recipe,
    ingredients,
    userId
  ) =>
  async (dispatch) => {
    const newMeal = {
      mealName: mealName,
      categoryId: categoryId,
      timeOfDayId: timeOfDayId,
      description: description,
      recipe: recipe,
      ingredients: ingredients,
    };
    try {
      const response = await axios.post(baseUrl + "/meals/" + userId, newMeal, {
        headers: headers,
      });
      return await dispatch(addMeal(response.data));
    } catch (err) {
      console.log(err.message);
    }
  };

export let addMeal = (meal) => ({
  type: ActionTypes.ADD_MEAL,
  payload: meal,
});

export const fetchMealsByUser = (id) => async (dispatch) => {
  try {
    const response = await axios.get(baseUrl + "/meals/"+id, {
      headers: headers,
    });
    return await dispatch(addMeals(response.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const addMeals = (meal) => ({
  type: ActionTypes.ADD_MEALS,
  payload: meal,
});

export const fetchMealByMealId = (id) => async (dispatch)=>{
  try{
    const meal = axios.get(baseUrl+"/meal/"+id, {
      headers: headers,
    });
    return await dispatch(addMeals(meal.data));
  } catch (err){
    console.log(err.message)
  }
}

export const updateMeal = (id, mealName, categoryId, timeOfDayId, description, recipe, ingredients) => async (dispatch) =>{
  
  const newMeal = {
    mealName: mealName,
    categoryId: categoryId,
    timeOfDayId: timeOfDayId,
    description: description,
    recipe: recipe,
    ingredients: ingredients
  };
  
  let mealId = id;

  try{
    const updatedMeal = await axios.put(baseUrl+"/meal/"+id, newMeal,{
      headers : headers,
    });
    return await dispatch(updateMeals(updatedMeal.data))
    
  }catch(err){
    console.log(err.message)
  }
}

export const updateMeals=(updatedMeal)=>({
  type: ActionTypes.UPDATE_MEAL,
  payload: updatedMeal
})




//OLD FETCH API BS
//PLURAL ACTION CREATOR/TYPE //
// export const fetchMeals = () => async (dispatch) => {
//   console.log('fetch meals');

//   const response = await fetch(baseUrl + "/meals/", {
//     method: "GET",
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer `+localStorage.getItem('token')
//     },
//     credentials: "same-origin"
//   });
//   const meal = await response.json()
//   return dispatch(addMeals(meal));
// };

//fetches ALL meals regardless of who's logged in
//we might be able to use this for displaying searchable meals that exist in the system?
//would need a new object though
// export const fetchMeals = () => async (dispatch) => {
//   try {
//     const response = await axios.get(baseUrl + "/meals/", {
//       headers: headers,
//     });
//     return dispatch(addMeals(response.data));
//   } catch (err) {
//     console.log(err.message);
//   }
// };

//this fetches meals of only the logged in users




//TODO ADD TO ACTION TYPES
// export const mealsLoading = () => ({
//     type: ActionTypes.MEALS_LOADING
// });

//TODO ADD TO ACTION TYPES
// export const mealsFailed = (errmess) => ({
//     type: ActionTypes.MEALS_FAILED,
//     payload: errmess
// });

//***END MEALS***//


//MEAL PLANS//

//this fetches all the meal plans based on user id
export const fetchMealPlansByUserId = (id) => async (dispatch) => {
  try {
    const mealPlan = await axios.get(baseUrl + '/mealplans/'+ id, {
      headers: headers,
    });
    return dispatch(addMealPlans(mealPlan.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const addMealPlans = (mealPlan) => ({
  type: ActionTypes.ADD_MEAL_PLANS,
  payload: mealPlan,
});


//this adds a meal plan to our meal plans

export const postMealPlan =
  (
    mealId,
    dayOfWeek
  ) =>
  async (dispatch) => {
    const newMealPlan = {
      mealId: mealId,
      dayOfWeek: dayOfWeek
    };
    try {
      const mealPlan = await axios.post(baseUrl + "/mealplan/", newMealPlan, {
        headers: headers,
      });
      return dispatch(addMealPlan(mealPlan.data));
    } catch (err) {
      console.log(err.message);
    }
  };

export let addMealPlan = (mealPlan) => ({
  type: ActionTypes.ADD_MEAL_PLAN,
  payload: mealPlan,
});

export const deleteMealPlan = (id) => async (dispatch) =>{
  try{
    const mealPlanToDelete = await axios.delete(baseUrl+'/mealplan/'+id,{
      headers: headers,
    });
    return await dispatch(deletePlan(mealPlanToDelete.data));
  } catch(err){
    console.log(err.message)
  }
};

export const deletePlan = (mealPlan) =>({
  type: ActionTypes.DELETE_MEAL_PLAN,
  payload : mealPlan,
})


//END MEAL PLANS//



// ***MEAL ACCOUNTS ***

export const addMealAccount = (mealAccount) => ({
  type: ActionTypes.ADD_MEAL_ACCOUNT,
  payload: mealAccount,
});

export let postMealAccount = (mealId, userId) => async (dispatch) => {
  const newMealAccount = {
    mealId: mealId,
    userId: userId,
  };

  const url =
    baseUrl + "/mealaccount/" + parseInt(mealId) + "/" + parseInt(userId);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newMealAccount),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
    credentials: "same-origin",
  }).then(
    (response) => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    },
    (error) => {
      var errmess = new Error(error.message);
      throw errmess;
    }
  );

  const mealAccount = response;
  return dispatch(addMealAccount(mealAccount));
};

export const fetchMealAccount = () => async (dispatch) => {
  const response = await fetch(baseUrl + "/mealaccounts/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  const mealAccount = await response.json();

  return dispatch(postAccounts(mealAccount));

  // return fetch(baseUrl + '/mealaccounts/')
  // .then(response => {
  //     if (response.ok) {
  //       return response;
  //     } else {
  //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
  //       error.response = response;
  //       throw error;
  //     }
  //   },
  //   error => {
  //         var errmess = new Error(error.message);
  //         throw errmess;
  //   })
  // .then(response => response.json())
  // .then(mealAccount => dispatch(postAccounts(mealAccount)));
};

export const postAccounts = (mealAccount) => ({
  type: ActionTypes.ADD_MEAL_ACCOUNTS,
  payload: mealAccount,
});

// *** END MEAL ACCOUNTS***
