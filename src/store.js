import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import { productDetailReducers, productListReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducers, userRegisterReducers } from './reducers/userReducers';

const reducer = combineReducers({
    productList : productListReducers,
    productDetails: productDetailReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [];
            
const userInfoFromStorage = localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : [];

const initialState = {
    cart : { cartItems : cartItemsFromStorage },
    
    userLogin : { userInfo : userInfoFromStorage }
}

const middlewares = [ 
    thunk
]

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
    )

export default store;