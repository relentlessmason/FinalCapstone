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


// export const fetchUser = (id) => (dispatch) => {    
//   return fetch(baseUrl + '/user/'+id)
//   .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//         error.response = response;
//         throw error;
//       }
//     },
//     error => {
//           var errmess = new Error(error.message);
//           throw errmess;
//     })
//   .then(response => response.json())
//   .then(users => dispatch(addUser(users)));
// };


//END TOKEN/USERS


//***MEALS***//



export const deleteMeal = () => ({
  type: ActionTypes.DELETE_MEAL
});

export const deleteMeals = (id) => async (dispatch) => {
  let auth= localStorage.getItem('token')

  const response = await fetch(baseUrl + "/meals/" + id, {
    method: "DELETE",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + auth
    }
  });
  const meal = await response.json();
  return dispatch(deleteMeal(meal));
}


 export  let  postMeal = 
 (mealName, categoryId, timeOfDayId, description, recipe, ingredients)  =>
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
        'Content-Type': 'application/json'
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
      .then((meal) => dispatch(addMeal(meal)))
      .catch((error) => {
        console.log("Post Meal ", error.message);
      });
  };

  export let addMeal =  (meal) => ({
    type: ActionTypes.ADD_MEAL,
    payload: meal
  });

  

export const fetchMeals = (auth) => async (dispatch) => {
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
};

export const addMeals = (meal) => ({
  type: ActionTypes.ADD_MEALS,
  payload: meal
});


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



// ***MEAL ACCOUNTS ***

export const addMealAccount = (mealAccount) => ({
  type: ActionTypes.ADD_MEAL_ACCOUNT,
  payload: mealAccount
});

export let postMealAccount = (mealId, userId) => (dispatch)=> {

const newMealAccount = {
  mealId: mealId,
  userId: userId
}

const url = baseUrl+'/mealaccount/'+parseInt(newMealAccount.mealId)+"/"+parseInt(newMealAccount.userId);


return fetch(url, {
  method: 'POST',
  body: JSON.stringify(newMealAccount),
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: "same-origin"
})
.then(response => {
  if (response.ok) {
    return response;
  } else {
    var error = new Error('Error ' + response.status + ': ' + response.statusText);
    error.response = response;
    throw error;
  }
},
(error) => {
      var errmess = new Error(error.message);
      throw errmess;
})
.then(response => response.json())
.then(mealAccount => dispatch(addMealAccount(mealAccount)))
.catch(error => {console.log('Post Meal Account ',error.message)})
}

export const fetchMealAccount = () => (dispatch) => {    
  return fetch(baseUrl + '/mealaccounts/')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(mealAccount => dispatch(postAccounts(mealAccount)));
};

export const postAccounts = (mealAccount) => ({
  type: ActionTypes.ADD_MEAL_ACCOUNTS,
  payload: mealAccount
});


// *** END MEAL ACCOUNTS***