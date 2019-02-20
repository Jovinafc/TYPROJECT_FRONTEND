import React, {Component} from 'react';
import classes from './CartItem.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/cart'
import { NavLink} from 'react-router-dom'
import * as actionp from '../../../store/actions/vehicle_click'
import { spinnerService } from '@chevtek/react-spinners';
import Loader from 'react-loader';

class CartItem extends Component {

    state = {
        counter:this.props.qty,
        price: this.props.price*this.props.qty,
        loaded: true
    }

    componentDidMount = () => {
        this.props.type_payment('Cart Item');
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
        spinnerService.show('mySpinner');
        axios.post('/removeCart', {user_id: localStorage.getItem('userId'), accessory_id: id, quantity: 1})
        .then(response => {
            console.log(response);
            this.props.cartItems(localStorage.getItem('userId'));
            this.props.cartAmountQuantity();
            spinnerService.hide('mySpinner');
        })
    }

    updateQuantity = (id) => {
        this.setState({
            loaded: false
        })
        console.log(this.state.counter);
        axios.post('/updateCart', {user_id: localStorage.getItem('userId'), accessory_id: id, quantity: this.state.counter} )
        .then(response => {
            console.log(response)
            // alert('Updated');
            this.props.cartItems(localStorage.getItem('userId'))
            this.props.quantityNum(this.state.counter);
            this.props.cartAmountQuantity();
            this.setState({
                loaded: true
            })
        });
    }

    quantityHandler = () => {
        this.props.quantityNum(this.state.counter);
    }   

    render () {
        return (
            // <div className={classes.Container}>
            //     <div className={classes.imageName}>
            //     <div className={classes.name}> 
            //         {this.props.name}    
            //     </div>

            //     <div className={classes.ImageContainer}>
            //         <img className={classes.Image} src={this.props.image} />
            //     </div>

            //     </div>

            //     <div className={classes.quantity}> 
            //         Quantity:
            //         <div>
            //             <button onClick={this.decreaseCounter} >
            //                 -
            //             </button>
            //             {/* <div className="col-xs-1"> */}
            //             <input readOnly className={classes.inputDiv}  id="count" type="number" value={this.state.counter} />
            //             {/* </div> */}
            //             <button onClick={this.increaseCounter}>
            //                 +
            //             </button>
            //         </div>
            //         <button onClick={() => this.updateQuantity(this.props.id)}>Update Quantity Amount</button>
            //     </div>

            //     <div className={classes.priceDiv}>
            //         Price {this.state.price}
            //     </div>

            //     <div>
            //         <button onClick={() => this.removeItemHandler(this.props.id)} className="btn btn-danger">Remove from Cart</button>
            //         <div style={{width:'5px'}}></div>
            //         <br />
            //         {/* <NavLink to={'/productpayment/:'+this.props.id}>
            //         <button className="btn btn-primary">Buy Product</button> </NavLink> */}
            //         <NavLink to={{
            //             pathname: '/productpayment/:'+this.props.id,
            //             data: {
            //                 qty: this.state.counter
            //             }}}>
            //         <button onClick={this.quantityHandler} className="btn btn-primary">Buy Product</button> </NavLink>
            //     </div>
            // </div>

            <Loader loaded={this.state.loaded} >
              <div className={classes.Container}>
            <div className={classes.imageName}>
            {/* <div className={classes.name}> 
                {this.props.name}    
            </div> */}

            <div className={classes.ImageContainer}>
                <img className={classes.Image} src={this.props.image} />
            </div>

            </div>

            <div className={classes.quantity}> 
                <div className={classes.name}> 
                    {this.props.name}    
                </div>
                    <div>
                    <button onClick={this.decreaseCounter} >
                        -
                    </button>
                    {/* <div className="col-xs-1"> */}
                    <input readOnly className={classes.inputDiv}  id="count" type="number" value={this.state.counter} />
                    {/* </div> */}
                    <button onClick={this.increaseCounter}>
                        +
                    </button>
                </div>
                <button style={{ }} onClick={() => this.updateQuantity(this.props.id)}>Update</button>
            </div>

            <div className={classes.priceDiv}>
                Price {this.state.price}
            </div>

            <div>
                <button onClick={() => this.removeItemHandler(this.props.id)} className="btn btn-danger">Remove from Cart</button>
                <div style={{width:'5px'}}></div>
                <br />
                {/* <NavLink to={'/productpayment/:'+this.props.id}>
                <button className="btn btn-primary">Buy Product</button> </NavLink> */}
                <NavLink to={{
                    pathname: '/productpayment/:'+this.props.id,
                    data: {
                        qty: this.state.counter
                    }}}>
                <button onClick={this.quantityHandler} className="btn btn-primary">Buy Product</button> </NavLink>
            </div>
        </div>
        </Loader>


        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        cartItems : (user_id) => dispatch(actions.cartItems(user_id)),
        type_payment: (payment_type) => dispatch(actionp.type_of_payment(payment_type)),
        quantityNum : (quantity) => dispatch(actions.quantityNum(quantity)),
        cartAmountQuantity: () => dispatch(actions.cartAmountQunatity())

    }
}

export default connect(null,mapDispatchToProps)(CartItem);