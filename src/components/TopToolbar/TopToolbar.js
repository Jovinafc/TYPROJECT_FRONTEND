import React, { Component } from 'react';
import classes from './TopToolbar.module.css'
import Signing from '../Signing/Signing';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Cart from '../../Images/Cart.png';
import * as actions from '../../store/actions/auth';
import shoppingCart from '../../Images/shopping-cart.png';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const style = {
    height: '95%',
    width: '5%',
    marginRight: '2%',
    textAlign: 'center',
    maxWidth: '100%',

}

class TopToolbar extends Component {

    

    state = {
        zero: 0,
        ppimage: this.props.image,
        number: 3, 
        no_of_items: 0
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.image !== prevProps.image){
            this.setState({
                ppimage: this.props.image   
            })
            this.props.photoFinish();
        }
        if(this.props.counter !== prevProps.counter){
            this.setState({
                no_of_items: this.props.counter
            })
        }
    }

    render () {
        console.log(this.props.item_number);
        let a = this.props.first_name.charAt(0);

        let sign = <Signing />
        if(this.props.isAuthenticated){
            sign = <div className={classes.afterlogin}>
            {this.props.image 
            ? <NavLink to="/Profile"><img className={classes.pp} src={this.state.ppimage} alt="pp"/> </NavLink>
            : <h2 style={{textAlign: "center",color: "white",  marginTop: "10%"}}>{a}</h2> }
            <div className={classes.dropdowncontent}>
                
                <NavLink to="/Profile">My Profile</NavLink>
                <NavLink to="/myvehicles">My Vehicles</NavLink>
                <NavLink to="/history">Vehicle History</NavLink>
                <NavLink to="/help">Help</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </div>
            </div>  
        }


        return (
            
            <div className={classes.nav}>
            <div className={classes.Logo}>Logo</div>
            <div className={classes.Name}>
                <h4>Website Name</h4>
            </div>
{/* 
            <div className={classes.cartCont}>
            </div> */}

            <div className={classes.cartCont} >
                <div style={{maxWidth: '100%'}}>
                <NavLink to="/cart">
                {/* {this.props.isAuthenticated 
                ? <h6 className={classes.items}>{this.props.item_number}</h6>
                : <h6 className={classes.items}>0</h6>
            } */}
                
                {/* <img src={shoppingCart} alt="Cart" className={classes.cart}/> */}
                {/* <i style={{color: 'red', fontSize: '2.0rem'}} className="fas fa-shopping-cart"></i> */}
                <IconButton aria-label="Cart">
                {this.props.isAuthenticated
                ?  <Badge badgeContent={this.props.item_number} color="primary"  >
                        <i style={{color: 'red', fontSize: '1.5rem'}} className="fas fa-shopping-cart"></i>
                    </Badge>
            
                
                : <Badge  badgeContent={this.state.zero} color="primary" >
                        <i style={{color: 'red', fontSize: '1.5rem'}} className="fas fa-shopping-cart"></i>
                </Badge>
                }
                </IconButton>
                </NavLink>
                </div>

                <div className={classes.dropdowndiv}>
                    {this.props.cart_items === undefined 
                    ? <div>Your Cart is Empty 
                    <br />
                    Keep Shopping
                    </div>
                    : <div>
                            {this.props.cart_items.slice(0,3).map(dis => {
                                return (
                                    <div className={classes.cartHoverDiv} key={dis.accessory_id}>
                                      <div className={classes.imageCont}>
                                          <img className={classes.cartimage} src={dis.accessory_image}/>  
                                      </div>
                                      
                                      <div className={classes.cartDetails}>
                                      {dis.accessory_name}
                                      </div>
                                    </div>
                                )
                            })}  
                            <div>
                                {this.props.item_number > 3
                                ? <span><NavLink to="/cart">{(this.props.item_number - 3 )} more</NavLink></span>
                                : <span><NavLink to="/cart">Go To Cart</NavLink> </span>}
                            </div>
                      </div>
                    
                    } 
                    
                </div>
            </div>

            {this.props.isAuthenticated 
            ? 
            <div style={style}>
                {sign}
            </div> 
            : <div className={classes.sign}> {sign} </div>}
        </div>

        
        );
    }

}



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        first_name: state.auth.first_name,
        image: state.auth.image,
        item_number: state.cart.item_number,
        cart_items: state.cart.cart

    };
};

const mapDispatchToProps = dispatch => {
    return {
        photoFinish: () => dispatch(actions.photoFinish())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);