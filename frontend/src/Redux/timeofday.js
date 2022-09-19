import * as ActionTypes from "./actionTypes";

export const TimeOfDay = (
  state = {
    tod: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_TIME_OF_DAY: {
      return { ...state, tod: action.payload };
    }

    default:
      return state;
  }
};
