import * as ActionTypes from "./actionTypes";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";



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


//think of this as a constuctor we're filling in, and it passes the data to an endpoint
//that we have mapped out on the backend

//SINGULAR ACTION CREATOR/TYPE//
export  let  postMeal =
 (mealName, categoryId, timeOfDayId, description, recipe, ingredients) =>
  async (dispatch) => {
    const newMeal = {
      mealName: mealName,
      categoryId: categoryId,
      timeOfDayId: timeOfDayId,
      description: description,
      recipe: recipe,
      ingredients: ingredients
    };

    
    

    const response = await fetch(baseUrl + "/meals/", {
      method: "POST",
      body: JSON.stringify(newMeal),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+localStorage.getItem('token')

      },
      credentials: "same-origin"
    })
    
      .then(
        (response) => {
          console.log(response)
          if (response.ok) {
            return response;
          } 
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      const meal = await response.json();
      
      return dispatch(addMeal(meal));
  };

  export let addMeal  = (meal) => ({
    type: ActionTypes.ADD_MEAL,
    payload: meal
  });

  
//PLURAL ACTION CREATOR/TYPE //
export const fetchMeals = () => async (dispatch) => {
  console.log('fetch meals');
  
  const response = await fetch(baseUrl + "/meals/", {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem('token')
    },
    credentials: "same-origin"
  });
  const meal = await response.json()
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

export let postMealAccount = (mealId, userId) => async (dispatch)=> {

const newMealAccount = {
  mealId: mealId,
  userId: userId
}

const url = baseUrl+'/mealaccount/'+parseInt(mealId)+"/"+parseInt(userId);

const response = await fetch(url, {
  method: 'POST',
  body: JSON.stringify(newMealAccount),
  headers: {
    Accept: 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer `+localStorage.getItem('token'),

  },
  credentials: "same-origin"
})
.then(response => {
  if (response.ok) {
    return response
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

const mealAccount = response
return dispatch(addMealAccount(mealAccount));

};

export const fetchMealAccount = () => async (dispatch) => {    

  const response = await fetch(baseUrl + '/mealaccounts/', {

    method: 'GET', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "same-origin"

  });

  const mealAccount = await response.json()

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
  payload: mealAccount
});


// *** END MEAL ACCOUNTS***