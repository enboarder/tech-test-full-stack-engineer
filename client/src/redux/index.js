import { createStore, combineReducers, compose } from 'redux';

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

const reducers = {
    spaceData: (oldState = {}, { type }) => {
        switch (type) {
            default:
                return oldState;
        }
    },
    capsules: (oldState = [], { type, capsules }) => {
        switch(type) {
            case 'UPDATE_CAPSULES':
                if (Array.isArray(capsules)) {
                    return capsules.sort((a, b) => a.original_launch_unix > b.original_launch_unix);
                } else {
                    return capsules;
                }
            default:
                return oldState;
        }
    },
    launchPad: (oldState = [], { type, launchPad }) => {
        switch(type) {
            case 'UPDATE_LAUNCH_PAD':
                return launchPad;
            default:
                return oldState;
        }
    },
    display: (_oldState, { type }) => {
        switch(type) {
            case 'UPDATE_CAPSULES':
                return 'CAPSULES';
            case 'UPDATE_LAUNCH_PAD':
                return 'LAUNCH_PAD';
            default:
                return '';
        }
    }
};

const slices = combineReducers({ ...reducers });

const  composeEnhancers = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;


const store = createStore(
    slices,
    composeEnhancers(),
);

export default store;
