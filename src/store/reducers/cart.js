import * as actionTypes from '../actions/actionTypes';
import { updateObject, updateSelect } from '../../shared/utility';

const initialState = {
    cart: [],
    item_number: 0,
    product_id: '',
    added_cart: false
};

const addItem = (state, action) => {
    return updateObject(state,{item_number: state.item_number + 1})
}

const removeItem = (state,action) => {
    return updateObject(state, {item_number: state.item_number - 1})
}

export const updateItems = (state,action) => {
    return updateObject(state, {item_number: action.no_of_items});
}

export const productClick = (state,action) => {
    return updateObject(state, {product_id: action.product_id});
}

export const cartDetails = (state,action) =>{
    return updateObject(state,{cart: action.cartDetails})
} 

export const setToZero = (state,action) => {
    return updateObject(state, {item_number: 0})
}

export const already_added_cart = (state,action) => {
    return updateObject(state, {added_cart: true})
}

export const removeItemFromCart = (state,action) => {
    return updateObject(state, {})
}

const reducer = (state=initialState, action ) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM: return(addItem(state,action))
        case actionTypes.REMOVE_ITEM: return(removeItem(state,action))
        case actionTypes.UPDATE_ITEMS: return(updateItems(state,action))
        case actionTypes.PRODUCT_CLICK: return(productClick(state,action))
        case actionTypes.CART_DETAILS: return(cartDetails(state,action))
        case actionTypes.SET_TO_ZERO: return(setToZero(state,action))
        case actionTypes.ALREADY_ADDED_TO_CART: return(already_added_cart(state,action))    
        default: return state;
    }
}

export default reducer;