import * as ActionTypes from './actionTypes';

export const Meal = (state = {
    meal:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MEAL:
            return {...state, meal: action.payload};

        default:
          return state;
      }
};