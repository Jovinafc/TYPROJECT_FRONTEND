import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    vehicle_id: null,
    vehicles: [],
    loading: false,
    
};

const FetchVehiclesStart = (state,action) => {
    return updateObject(state, {loading: true});
}

const FetchAllVehiclesSuccess = (state, action) => {
    return updateObject(state, {vehicles: action.vehicles, loading: false})
}

const FetchAllVehiclesFail = (state, action) => {
    return updateObject(state, {loading:false})
}



const CardClick = (state, action) => {
    return updateObject(state, {vehicle_id: action.vehicle_id})
};



const Clear = (state,action) => {
    return updateObject(state, {vehicles: []})
};

const OnVehicleID = (state,action) => {
    return updateObject(state, {vehicle_id: action.vehicle_id});
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.CARD_CLICK: return CardClick(state,action);
        case actionTypes.CLEAR: return Clear(state,action);
        case actionTypes.FETCH_ALL_VEHICLES_SUCCESS: return FetchAllVehiclesSuccess(state,action);
        case actionTypes.FETCH_ALL_VEHICLES_START: return FetchVehiclesStart(state,action);
        case actionTypes.FETCH_ALL_VEHICLES_FAIL: return FetchAllVehiclesFail(state,action);
        case actionTypes.ON_VEHICLE_ID: return OnVehicleID(state,action);
        default: return state;
    }
};

export default reducer;




