import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import { productListReducers } from './reducers/productReducers';

const reducer = combineReducers({
    productList : productListReducers,
});

const initialState = {}

const middlewares = [ 
    thunk
]

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
    )

export default store;