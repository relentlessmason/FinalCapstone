import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import { Meal } from './meal'
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {MealAccount} from './mealAccount';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            meal: Meal,
            mealAccount: MealAccount
            
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}