import * as ActionTypes from './actionTypes'
import { baseUrl } from '../Shared/baseUrl';


//ADD TOKEN/USERS
export const addToken = (token) => ({
    type: ActionTypes.ADD_TOKEN,
    payload: token
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const deleteUser = () => ({
    type: ActionTypes.DELETE_USER
})
//END TOKEN/USERS

//***MEALS***//

export const fetchMeals = () => (dispatch) => {

    return fetch(baseUrl + '/meals/')
   
    .then(response => response.json())
    .then(meals => dispatch(addMeals(meals)));

    //TODO AFTER ACTION TYPES
    // .catch(error => dispatch(dishesFailed(error.message)));
}


//TODO ADD TO ACTION TYPES
// export const mealsLoading = () => ({
//     type: ActionTypes.MEALS_LOADING
// });

//TODO ADD TO ACTION TYPES
// export const mealsFailed = (errmess) => ({
//     type: ActionTypes.MEALS_FAILED,
//     payload: errmess
// });

export const addMeals = (meals) => ({
    type: ActionTypes.ADD_MEAL,
    payload: meals
});

//***END MEALS***//