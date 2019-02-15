import React, { Component } from 'react';
import classes from './Accessory.module.css';
import {NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/cart';
import Alert from 'react-bootstrap/Alert';


class Accessory extends Component {

    state = {
        // ids: this.props.cartItems.map(a => a.accessory_id)
    }
    
    render () {
        // console.log(this.props.cartItems.map(a => a.accessory_id));
        return (
            <div className={classes.CardContainer}>
                <div className={classes.Card}>
                    <div className={classes.ImageContainer}>
                        <img className={classes.Image}src={this.props.image} alt="Im"/>
                    </div>

                    <div className={classes.content}>
                         <div className={classes.Name}>
                             <h5 className={classes.na} onClick={() => this.props.onCardClick(this.props.id)}><NavLink to={'/productdetail/:'+this.props.id}>{this.props.name}</NavLink></h5>
                         </div>

                         <div className={classes.Price}>
                             <h6>&#x20B9; {this.props.price}</h6>
                         </div>

                         <div className={classes.add}>
                              {this.props.isAuthenticated
                                ? <button onClick={() => this.props.addToCart(this.props.user_id, this.props.id, this.props.qty)} className="btn btn-success">Add to Cart</button>
                                : <button className="btn btn-success">Add to Cart</button>   
                                }  
                             
{/* 
                             <Alert show={this.props.inCart} variant="dark">
                                    Item already exists in cart
                             </Alert> */}
                         </div>
                    </div>
                    

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId,
        cartItems: state.cart.cart,
        inCart: state.cart.added_cart,
        isAuthenticated: state.auth.token !== null,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (user_id, accessory_id, quantity) => dispatch(actions.addToCart(user_id, accessory_id, quantity)),
        onCardClick: (product_id) => dispatch(actions.onProductClick(product_id))   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accessory);
