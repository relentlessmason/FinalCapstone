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
  try{
  await axios.put(`${baseUrl}/meal/${id}`, newMeal,{
      headers : headers,
    }).then(dispatch(updateMeals(newMeal)));
  }catch(err){
    console.log(err.message)
  }
}

export const updateMeals=(newMeal)=>({
  type: ActionTypes.UPDATE_MEAL,
  payload: newMeal,
})

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


//CATEGORY AND TIME OF DAY

export const addCategory = (category) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: category,
});

export const fetchCategory = () => async (dispatch) => {
try {
  const response = await axios.get(baseUrl + "/category/", {
    headers: headers,
  })
  return await (dispatch(addCategory(response.data)));
} catch (err) {
  console.log(err.message);
}
};

export const addTimeOfDay = (timeOfDay) => ({
  type: ActionTypes.ADD_TIME_OF_DAY,
  payload: timeOfDay,
});

export const fetchTimeOfDay = () => async (dispatch) => {
try {
  const response = await axios.get(baseUrl + "/timeofday/", {
    headers: headers,
  })
  return await (dispatch(addTimeOfDay(response.data)));
} catch (err) {
  console.log(err.message);
}
};

//END CATEGORY AND TIME OF DAY

//START PANTRY

//GET
export const addPantries = (pantry) => ({
  type: ActionTypes.ADD_TO_PANTRYS,
  payload: pantry,
});

export const fetchPantryByUser = (id) => async (dispatch) => {
try {
  const response = await axios.get(`${baseUrl}/pantry/user/${id}`, {
    headers: headers,
  })
  return await (dispatch(addPantries(response.data)));
} catch (err) {
  console.log(err.message);
}
};

//POST
export let addPantryItem = (pantry) => ({
  type: ActionTypes.ADD_TO_PANTRY,
  payload: pantry,
});

export const postPantry = (newPantryItem,  userId) =>
  async (dispatch)  => {
    try {
      console.log('post to pantry', newPantryItem);
      // const fixedPantry = {
      //   ingredientsName: newPantryItem.pantry
      // }
      const newItem = {
        userId: userId,
        ingredientsName: newPantryItem.pantry,
        qty: 1
      };
     await axios.post(`${baseUrl}/pantry/${userId}`, newItem, {
        headers: headers,
      }).then(dispatch(addPantryItem(newItem)));
    } catch (err) {
      console.log(err.message);
    }
  };

//DELETE
export const deleteFromPantry = (id) => ({
  type: ActionTypes.DELETE_FROM_PANTRY,
  payload: id
});

export const deletePantryItem = (id) => async (dispatch) => {
    try {
  await axios.delete(`${baseUrl}/pantry/${id}}`, {
      headers: headers,
    }).then((dispatch(deleteFromPantry(id))));
  } catch (err) {
    console.log(err.message);
  }
};

//END PANTRY
