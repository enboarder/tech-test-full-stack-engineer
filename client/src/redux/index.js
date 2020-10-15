import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import spaceData from './spaceData/spaceDataReducer';

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

const slices = combineReducers({ spaceData});

const  composeEnhancers = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;


const store = createStore(
    slices,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
