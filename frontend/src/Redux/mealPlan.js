import * as ActionTypes from "./actionTypes";

export const MealPlan = (
  state = {
    mealPlan: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_MEAL_PLANS:
      return { ...state, mealPlan: action.payload };

    case ActionTypes.ADD_MEAL_PLAN:
      let m = action.payload;
      return { ...state, mealPlan: state.mealPlan.concat(m) };

    // case ActionTypes.DELETE_MEAL_PLAN:
    //   return {...state, id: null, dayOfWeek: ''}
      // return state.filter((mealPlan) => mealPlan.id !== action.payload.id);

      case ActionTypes.DELETE_MEAL_PLAN:
      return {
        ...state,
        mealPlan: state.mealPlan.filter((mealPlan) => mealPlan !== action.payload),
      };

    default:
      return state;
  }
};
