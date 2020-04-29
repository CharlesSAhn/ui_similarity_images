import React from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

export default ({ children, initialState = {} }) => {

    const store = createStore(
        reducers, 
        initialState, 
        composeWithDevTools(applyMiddleware(reduxPromise))
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};