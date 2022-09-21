import * as ActionTypes from "./actionTypes";

export const Pantry = (
    state = {
        pantry: [],
    },
    action 
) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_PANTRYS:{
            return { ...state, pantry: action.payload};
        }

        case ActionTypes.ADD_TO_PANTRY:{
            let p = action.payload;
            return { ...state, pantry: state.pantry.concat(p)};
}
        case ActionTypes.DELETE_FROM_PANTRY:{
            return { ...state.pantry.filter((pantry) => pantry !== action.payload),
            }}

            default:
                return state;
    }
};

