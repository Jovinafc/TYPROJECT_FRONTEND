import * as actionTypes from './actionTypes';
import axios from 'axios';

export const FetchAllVehiclesStart = () => {
    return {
        type: actionTypes.FETCH_ALL_VEHICLES_START
    }
}

export const FetchAllVehiclesSuccess = (vehicles) => {
    return {
        type: actionTypes.FETCH_ALL_VEHICLES_SUCCESS,
        vehicles: vehicles
    }
}

export const FetchAllVehiclesFail = (error) => {
    return {
        type: actionTypes.FETCH_ALL_VEHICLES_FAIL,
        error: error
    }
}

export const fetchVehicles = (user_id) => {
    return dispatch=> {
        dispatch(FetchAllVehiclesStart);
        axios.post('/fetch-vehicles-except-current-user', {user_id: user_id}).then(result => {
            const fetchedValues = [];
            for(let key in result.data){
                fetchedValues.push({
                    ...result.data[key],
                    id: key
                });
            }
            dispatch(FetchAllVehiclesSuccess(fetchedValues))
        })
        .catch(err => {
            dispatch(FetchAllVehiclesFail(err));
        })
};
};


export const onCardClick = (vehicle_id) => {
    localStorage.removeItem('vehicle_id');
    localStorage.setItem('vehicle_id', vehicle_id);
    return {
        type: actionTypes.CARD_CLICK,
        vehicle_id: vehicle_id
        
    };
    
}

export const onCard = (vehicle_id) => {
    return dispatch=> {
        dispatch(onCardClick(vehicle_id));
    }
}

export const onVehicleID = (vehicle_id) => {
    return {
        type: actionTypes.ON_VEHICLE_ID,
        vehicle_id: vehicle_id
    }
}


export const checkVehicleID = () => {
    return dispatch => {
        const vehicle_id = localStorage.getItem('vehicle_id');
        dispatch(onVehicleID(vehicle_id));
    }
}