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

//GET
export const addMeals = (meal) => ({
  type: ActionTypes.ADD_MEALS,
  payload: meal,
});

export const fetchMealsByUser = (id) => async (dispatch) => {
try {
  const response = await axios.get(baseUrl + "/meals/"+id, {
    headers: headers,
  })
  return await (dispatch(addMeals(response.data)));
} catch (err) {
  console.log(err.message);
}
};

//POST
export let addMeal = (meal) => ({
  type: ActionTypes.ADD_MEAL,
  payload: meal,
});

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
  async (dispatch)  => {
    const newMeal = {
      mealName: mealName,
      categoryId: categoryId,
      timeOfDayId: timeOfDayId,
      description: description,
      recipe: recipe,
      ingredients: ingredients,
    };
    try {
     await axios.post(baseUrl + "/meals/" + userId, newMeal, {
        headers: headers,
      }).then(dispatch(addMeal(newMeal)));
    } catch (err) {
      console.log(err.message);
    }
  };

//DELETE
export const deleteMeal = (id) => ({
  type: ActionTypes.DELETE_MEAL,
  payload: id
});

export const deleteMeals = (id) => async (dispatch) => {
  let newId = parseInt(id);
    try {
  await axios.delete(baseUrl + "/meals/" + newId, {
      headers: headers,
    }).then((dispatch(deleteMeal(newId))));
  } catch (err) {
    console.log(err.message);
  }
};

//UPDATE

export const updateMeal = (id, newMeal) => async (dispatch) =>{
  let mealId = parseInt(id);
  try{
  await axios.put(baseUrl+'/meal/'+mealId, newMeal,{
      headers : headers,
    }).then(dispatch(updateMeals(newMeal)));
  }catch(err){
    console.log(err.message)
  }
}

export const updateMeals=(newMeal)=>({
  type: ActionTypes.UPDATE_MEAL,
  payload: newMeal
})

//FETCH BY MEAL SPECIFIC (I don't think it works atm)
export const fetchMealByMealId = (id) => async (dispatch)=>{
  try{
    const meal = await axios.get(baseUrl+"/meal/"+id, {
      headers: headers,
    }).then(dispatch(addMeals(meal.data)));    
  } catch (err){
    console.log(err.message)
  }
}

//END MEALS//

//START MEAL PLANS//

//GET
export let addMealPlans = (mealPlan) => ({
  type: ActionTypes.ADD_MEAL_PLANS,
  payload: mealPlan,
});

export const fetchMealPlansByUserId = (id) => async (dispatch) => {
  try {
    const mealPlan = await axios.get(baseUrl + '/mealplans/'+ id, {
      headers: headers,
    });
    return await dispatch(addMealPlans(mealPlan.data));
  } catch (err) {
    console.log(err.message);
  }
};

//POST

export let addMealPlan = (mealPlan) => ({
  type: ActionTypes.ADD_MEAL_PLAN,
  payload: mealPlan,
});

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
     await axios.post(baseUrl + "/mealplan/", newMealPlan, {
        headers: headers,
      }).then(dispatch(addMealPlan(newMealPlan)));
    } catch (err) {
      console.log(err.message);
    }
  };


  //DELETE

  export const deletePlan = (id) =>({
    type: ActionTypes.DELETE_MEAL_PLAN,
    payload : id,
  })

export const deleteMealPlan = (id) => async (dispatch) =>{
  let deletedId = parseInt(id);
  try{
    await axios.delete(baseUrl+'/mealplan/'+deletedId,{
      headers: headers,
    }).then(dispatch(deletePlan(deletedId)));
  } catch(err){
    console.log(err.message)
  }
};

//UPDATE

export const updateMealPlan = (mealPlan) => async (dispatch) =>{

 let mealPlanId = mealPlan.mealPlanId;

 let newPlan = {
  mealId : mealPlan.mealId,
  dayOfWeek : mealPlan.dayOfWeek
 }


  try{
  await axios.put(baseUrl+'/updatemealplan/'+ mealPlanId , newPlan,{
      headers : headers,
    }).then(dispatch(updateMealPlans(mealPlan)));
  }catch(err){
    console.log(err.message)
  }
}

export const updateMealPlans=(mealPlan)=>({
  type: ActionTypes.UPDATE_MEAL_PLAN,
  payload: mealPlan,
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
