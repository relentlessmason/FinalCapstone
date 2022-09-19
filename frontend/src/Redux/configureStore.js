import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {Token} from './token';
import {User} from './user';
import { Meal } from './meal';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {MealAccount} from './mealAccount';
import { MealPlan } from './mealPlan'
import { Category } from './category';
import { TimeOfDay } from './timeofday';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            meal: Meal,
            mealAccount: MealAccount,
            mealPlan: MealPlan,
            category: Category,
            tod: TimeOfDay,
            
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}