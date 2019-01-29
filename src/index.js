import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import vehicleReducer from './store/reducers/vehicle_click';
import axios from 'axios';

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
    vehicle: vehicleReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

console.log(store.getState());




const app = (
    <Provider store={store}>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
