import React, {Component} from 'react';
import classes from './ProductDetail.module.css';
import axios from '../../axios';
import { NavLink, Redirect} from 'react-router-dom'
import * as actions from '../../store/actions/vehicle_click';
import { connect} from 'react-redux';
import * as actionp from '../../store/actions/cart';
import { useAlert } from 'react-alert';


class ProductDetail extends Component {

    

    state = {
        product: [],
        counter: 1,
        price: this.props.price,
        buyButton: true,
        direct: false
    }

    increaseCounter = (e) => {
        this.setState({
            buyButton: true,
            counter : this.state.counter + 1,
            price: this.props.price  * (this.state.counter+1)  
        })
    }

    decreaseCounter = (e) => {
        if(this.state.counter !== 1){
            this.setState({
                buyButton: true,
                counter : this.state.counter - 1,
                price: this.props.price * (this.state.counter-1)
            })
        }        

    }

    updateQuantity = () => {
        console.log(this.state.counter);
        axios.post('/direct-buy-check', {user_id: localStorage.getItem('userId'), accessory_id: this.state.product.accessory_id, quantity: this.state.counter} )
        .then(response => {
            console.log(response)
            alert(response.data);
            // if(response.data === 'Insuffiecient')
            if(response.data === 'Insufficient Stock'){
                this.setState({
                    buyButton: false
                })
            }
            else {
                this.setState({
                    buyButton: true
                })
            }
        });
    }

    buyProduct = () => {
        axios.post('/direct-buy-check', {user_id: localStorage.getItem('userId'), accessory_id: this.state.product.accessory_id, quantity: this.state.counter})
        .then(response => {
            console.log(response);
            if(response.data === 'Insufficient Stock'){
                alert("Insufficient Data")
                this.setState({
                    buyButton: false,
                    direct: false
                })
            }
            else {
                this.props.quantityNum(this.state.counter)
                this.setState({
                    buyButton: true,
                    direct:true
                })
            }
        })
    }



    componentDidMount () {
        window.scrollTo(0,0);
        const {match: {params}} = this.props;
        let a = params.product_id
        a = a.substring(1);
        this.props.type_payment('Single Item')

        axios.post('/fetch-specific-accessory', {accessory_id: a})
        .then(response => {
            console.log(response);
            this.setState({
                product: response.data
            })

            console.log(this.state.product);
        })
        


    }


    render () {
        let directProd = null;
        if(this.state.direct){  
            directProd = <Redirect to={'/productpayment/:'+this.state.product.accessory_id} />
        }

        return (
            <div className={classes.Container}>
                    {directProd}
                    <h2>Product Detail</h2>

                    <div className={classes.pdcontainer}>

                        <div>
                            <h5>{this.state.product.accessory_name}</h5>
                        </div>
                        <div className={classes.imgcontainer}>
                            <img className={classes.img} src={this.state.product.accessory_image} />
                        </div>

                        <div className={classes.quantity}> 
                    Quantity:
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
                    <button onClick={this.updateQuantity}>Check Product Availability</button>
                </div>
                    </div>

                <div className={classes.buttonContainer}>

                {
                    localStorage.getItem('token') === null
                 
                 ? <div className={classes.but}>
                     <NavLink to="/login"><button className="btn btn-primary">Kindly Sign In</button></NavLink>
                   </div>  
               
                 : <div className={classes.but}>
                     {
                            <div>
                             
                             {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                             ? <NavLink to="/Profile"><button className="btn btn-primary">Update your Profile</button></NavLink>

                            //  : <NavLink  to={'/productpayment/:'+this.state.product.accessory_id} ><button disabled={!this.state.buyButton} className="btn btn-primary">Buy Product</button> </NavLink>
                             : <button onClick={this.buyProduct}>Buy Product</button>
                              
                             }  
                           </div> 
                           
                                }
                            </div> 
                                  
                     }



                </div>
                                    
                              
                  
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      type_payment: (payment_type) => dispatch(actions.type_of_payment(payment_type)),
      quantityNum : (quantity) => dispatch(actionp.quantityNum(quantity))
    }
  }
  

export default connect(null,mapDispatchToProps)(ProductDetail);