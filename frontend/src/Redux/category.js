import * as ActionTypes from "./actionTypes";

export const Category = (
  state = {
    category: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY: {
      return { ...state, category: action.payload };
    }

    default:
      return state;
  }
};
