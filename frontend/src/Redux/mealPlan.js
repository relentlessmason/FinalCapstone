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

    case ActionTypes.DELETE_MEAL_PLAN: {
      const updateMealPlan = state.mealPlan.filter(
        (mp) => mp.mealPlanId != action.payload
      );
      return { ...state, mealPlan: updateMealPlan };
    }

    case ActionTypes.UPDATE_MEAL_PLAN:
      return {
        ...state,
        mealPlan: state.mealPlan.filter(
          (mealPlan) => (mealPlan = action.payload)
        ),
      };

    default:
      return state;
  }
};
