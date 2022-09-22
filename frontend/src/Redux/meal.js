import * as ActionTypes from "./actionTypes";

export const Meal = (
  state = {
    meal: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_MEALS: {
      return { ...state, meal: action.payload };
    }

    case ActionTypes.ADD_MEAL: {
      let m = action.payload;
      return { ...state, meal: state.meal.concat(m) };
    }

    case ActionTypes.DELETE_MEAL: {
      const updateMeals = state.meal.filter(
        (meal) => meal.id != action.payload
      );
      return { ...state, meal: updateMeals };
    }

    case ActionTypes.UPDATE_MEAL: {
      const updatedMeal = state.meal.map((meal) => {
        if (meal.id == action.payload) {
          return {
            ...state,
            meal: action.payload,
          };
        }
        return meal;
      });

      return {
        meal: updatedMeal,
      };
    }

    default:
      return state;
  }
};
