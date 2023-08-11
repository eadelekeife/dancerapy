import "./assets/css/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Homepage from "./pages/homepage";
import AppRoutes from "./routes";

import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';


const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultStore = {
    userDetails: {},
    isAuthenticated: false,
    cartData: []
};

const authReducer = (store = defaultStore, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return { ...store, userDetails: action.payload.userDetails, isAuthenticated: true };
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('token');
            return {
                ...store,
                userDetails: {},
                isAuthenticated: false
            };
        case 'UPDATE_USER':
            return {
                ...store,
                userDetails: action.payload
            };
        case 'UPDATE_CART_DATA':
            return {
                ...store,
                cartData: action.payload
            }
        default:
            return store
    }
}

const login_error = {
    loginError: {}
}

const loginError = (store = login_error, action) => {
    switch (action.type) {
        case 'LOGIN_FAILURE':
            return {
                ...store,
                loginError: action.payload
            };
        default:
            return store
    }
}

let combinedReducers = combineReducers({
    auth: authReducer,
    loginError
})
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['loginError']
}

const persistedReducer = persistReducer(persistConfig, combinedReducers)

let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)

const App = () => {
    return (
        <div>
            <AppRoutes />
        </div>
    )
}


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
</Provider>)