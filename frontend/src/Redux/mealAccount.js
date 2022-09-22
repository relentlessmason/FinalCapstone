import * as ActionTypes from "./actionTypes";

export const MealAccount = (
  state = {
    mealAccount: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_MEAL_ACCOUNTS:
      return { ...state, mealAccount: action.payload };

    case ActionTypes.ADD_MEAL_ACCOUNT:
      let m = action.payload;
      return { ...state, mealAccount: state.mealAccount.concat(m) };

    default:
      return state;
  }
};