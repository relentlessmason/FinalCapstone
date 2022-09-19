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

  

//       case COMPLETE_TODO: {
//  const index = state.todos.findIndex(todo => todo.id !==                                                                        action.payload); //finding index of the item
//  const newArray = [...state.todos]; //making a new array
//  newArray[index].completed = true//changing value in the new array
//  return { 
//   ...state, //copying the orignal state
//   todos: newArray, //reassingning todos to new array
//  }
// }
      //       return {
      // ...state, 
      // meal: action.payload };

    case ActionTypes.UPDATE_MEAL: {

      const updatedMeal = state.meal.filter((meal) => {
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
