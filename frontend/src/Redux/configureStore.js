import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {Token} from './token';
import {User} from './user';
import { Meal } from './meal';
import logger from 'redux-logger';
import { MealPlan } from './mealPlan'
import { Category } from './category';
import { TimeOfDay } from './timeofday';
import { Pantry } from './pantry';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            meal: Meal,
            mealPlan: MealPlan,
            category: Category,
            tod: TimeOfDay,
            pantry: Pantry,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}