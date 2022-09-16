import { RiContrastDropLine } from "react-icons/ri";
import { updateMeals } from "./actionCreators";
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

    // case ActionTypes.DELETE_MEAL:
    //   return {
    //     ...state,
    //     meal: state.meal.filter((meal) => parseInt(meal.id) !== action.payload)};

    case ActionTypes.DELETE_MEAL: {
      const updateMeals = state.meal.filter(
        (meal) => meal.id != action.payload
      );
      return { ...state, meal: updateMeals };
    }

    // case ActionTypes.UPDATE_MEAL:
    //   return {
    //     ...state, meal: state.meal.filter((meal) => meal = action.payload)};

    case ActionTypes.UPDATE_MEAL: {
      const updatedMeal = state.meal.map((meal) => {
        if (meal.id == action.payload.id) {
          return {
            ...state,
            meal: action.payload,
          };
        }
        return meal;
      });
      return {
        ...state,
        meal: updatedMeal,
      };
    }

    default:
      return state;
  }
};
