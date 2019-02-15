import React, {Component} from 'react';
import classes from './CartItem.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/cart'
import { NavLink} from 'react-router-dom'

class CartItem extends Component {

    state = {
        counter:1,
        price: this.props.price
    }

    increaseCounter = (e) => {
        this.setState({
            counter : this.state.counter + 1,
            price: this.props.price  * (this.state.counter+1)  
        })
    }

    decreaseCounter = (e) => {
        if(this.state.counter !== 1){
            this.setState({
                counter : this.state.counter - 1,
                price: this.props.price * (this.state.counter-1)
            })
        }        
    }

    removeItemHandler = (id) => {
        axios.post('/removeCart', {user_id: localStorage.getItem('userId'), accessory_id: id, quantity: 1})
        .then(response => {
            console.log(response);
            this.props.cartItems(localStorage.getItem('userId'))
        })
    }

    updateQuantity = (e) => {
        e.preventDefault();

        axios.post('', )
        .then(response => {
            console.log(response)
        });
    }

    render () {
        return (
            <div className={classes.Container}>
                <div className={classes.imageName}>
                <div className={classes.name}> 
                    {this.props.name}    
                </div>

                <div className={classes.ImageContainer}>
                    <img className={classes.Image} src={this.props.image} />
                </div>

                </div>

                <div className={classes.quantity}> 
                    Quantity:
                    <div>
                        <button onClick={this.decreaseCounter} >
                            -
                        </button>
                        {/* <div className="col-xs-1"> */}
                        <input readOnly classname={classes.inputDiv}  id="count" type="number" value={this.state.counter} />
                        {/* </div> */}
                        <button onClick={this.increaseCounter}>
                            +
                        </button>
                    </div>
                    <button onClick={this.updateQuantity}>Update Quantity Amount</button>
                </div>

                <div className={classes.priceDiv}>
                    Price {this.state.price}
                </div>

                <div>
                    <button onClick={() => this.removeItemHandler(this.props.id)} className="btn btn-danger">Remove from Cart</button>
                    <div style={{width:'5px'}}></div>
                    <br />
                    <NavLink to={'/productpayment/:'+this.props.id}><button className="btn btn-primary">Buy Product</button> </NavLink>
                </div>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        cartItems : (user_id) => dispatch(actions.cartItems(user_id))
    }
}

export default connect(null,mapDispatchToProps)(CartItem);