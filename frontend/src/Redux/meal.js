import * as ActionTypes from "./actionTypes";

export const Meal = (
  state = {
    meal: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_MEALS:
      return { ...state, meal: action.payload };

    case ActionTypes.ADD_MEAL:
      let m = action.payload;
      return { ...state, meal: state.meal.concat(m) };

    case ActionTypes.DELETE_MEAL:
      return {
        ...state,
        meal: state.meal.filter((meal) => parseInt(meal.id) !== action.payload)};

    case ActionTypes.UPDATE_MEAL:
      return {
        ...state, meal: state.meal.filter((meal) => meal = action.payload)};

        // case ActionTypes.UPDATE_MEAL:
        //   return {
        //     ...state, meal: action.payload };

    default:
      return state;
  }
};
