import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import { Meal } from './meal'
import {createForms} from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            meal: Meal
            
        }),
        applyMiddleware(thunk)
    );

    return store;
}