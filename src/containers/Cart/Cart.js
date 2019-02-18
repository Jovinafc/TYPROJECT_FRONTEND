import React,{ Component} from 'react';
import classes from './Cart.module.css';
import { connect } from 'react-redux'
import axios from 'axios';
import CartItem from './CartItem/CartItem';
import * as actions from '../../store/actions/cart';

class Cart extends Component {
    
    state = {
        cart : this.props.cart_items,
        newcart: [],
        noofItems: 0,
        totalPrice: 0
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.cart_items !== prevProps.cart_items){
            this.setState({
                cart: this.props.cart_items
            })
        }


        
    }

    componentDidMount = () => {
        console.log("Inside componnent Did Mount")

        axios.post('/checkout-check', {user_id: localStorage.getItem('userId')})
        .then(response => {
            console.log(response.data);
            this.setState({
                noofItems: response.data.count,
                totalPrice: response.data.grand_total
            })
        })
        // this.props.getCartItems(localStorage.getItem('userId'))
        // axios.post('/cartItems', {user_id: localStorage.getItem('userId')})
        // .then(response => {
        //     console.log(response);
        //     console.log(response.data);
        //     if(response.data.count !== 0){
        //         this.setState({
        //             cart: response.data.accessory_details
                    
        //         })
    
        //     }
                       // this.state.cart.map(dis => {
            //     axios.post('/fetch-specific-accessory', {accessory_id: dis.accessory_id})
            //     .then(response => {
            //         console.log(response);
            //         this.setState({
            //             newcart: response.data
            //         })
            //     })
            // }) 
        // })
        // .catch(err => {
        //     console.log(err);
        // })

           

    }



    render () {
        console.log(this.state.cart);
        console.log(this.props.cart_items)
        let display = null;
        // this.state.cart.map(dis => {
        //    display = <div> 
        //         <div>
        //             {dis.accessory_name}
        //         </div>
        //         <div>
        //             {dis.accessory_type}
        //         </div>
        //         <div>
        //             {dis.accessory_use}
        //         </div>
        //     </div>
        // })

        // let no_items = <div>
        //                     <h3>Your Cart is Empty</h3>
        //                </div>

        let displayCartItems = null;
        if(this.props.cart_items !== undefined ){
             displayCartItems = this.state.cart
        .map(dis => {
            return (    
                

                <CartItem  
                key={dis.accessory_id}
                name={dis.accessory_name}
                id={dis.accessory_id}
                price={dis.accessory_price}
                image={dis.accessory_image}
                details={dis.accessory_details}
                qty={dis.cart_storages[0].quantity}
                type={dis.accessory_type}
                use={dis.accessory_use}
                />

                            
            )
        })


        }
        else {
            displayCartItems = <div className={classes.empty}>
                                  <h3>Your Cart is Empty</h3>
                             </div>
        }
        
        return (
            <div className={classes.Container}>
                    <h2> Cart Page</h2>
                    {/* {this.state.cart.length === 0
                    ? {no_items}
                    : {displayCartItems}} */}
                    {/* {this.state.cart.length === 0
                    ? <div className={classes.cartpage}> {no_items} </div>
                    
                    : <div> {displayCartItems} </div> } */}
                    {/* {displayCartItems} */}
                    {displayCartItems}
                    {this.props.item_number > 0
                    ? <div className={classes.checkoutDiv}>
                    {/* <h4>Toal Price</h4> */}
                     <div>
                         <h3>Grand Total</h3>
                     </div>       
                     <div>
                         No of Items: {this.state.noofItems}
                         Grand Total: {this.state.totalPrice}
                    </div>
                    </div>
                    :<div> </div>}
                    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart_items: state.cart.cart,
        item_number: state.cart.item_number
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCartItems: (user_id) => dispatch(actions.cartItems(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);