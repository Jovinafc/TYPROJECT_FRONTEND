import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart'; 
import vehicleReducer from './store/reducers/vehicle_click';
import axios from 'axios';
import { func } from 'prop-types';
import { ToastContainer} from 'react-toastify';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'


axios.defaults.baseURL = 'http://localhost:3001';
// console.log(localStorage.getItem('token'));
// axios.defaults.headers.get['x-auth'] = localStorage.getItem('token');
axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
// axios.defaults.headers.post['x-auth'] = localStorage.getItem('token');   
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.get['Content-Type'] = 'application/json';



axios.interceptors.request.use(request => {
    request.headers.authorization = localStorage.getItem('token');
    console.log(request);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    vehicle: vehicleReducer,
    cart: cartReducer
})

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }
    catch(e) {
        console.log(e);
    }
}

function loadFromStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined
        return JSON.parse(serializedState);
    }
    catch (e) {
        console.log(e);
        return undefined
    }
} 

const persistedState = loadFromStorage()

const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(thunk)
));

// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunk)
// ));
console.log(store.getState());
// persistStore(store);

store.subscribe(() => saveToLocalStorage(store.getState()))

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

const app = (
    <Provider store={store}>
        <BrowserRouter> 
            <AlertProvider {...options} template={AlertTemplate}>
            <App />
            {/* <ToastContainer />   */}
            
            {/* </App> */}
            </AlertProvider>
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'), document.querySelector('[data-mount]'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
