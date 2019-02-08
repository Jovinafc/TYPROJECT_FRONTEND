import React, { Component } from 'react';
import classes from './TopToolbar.module.css'
import Signing from '../Signing/Signing';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Cart from '../../Images/Cart.png';
import * as actions from '../../store/actions/auth';
import shoppingCart from '../../Images/shopping-cart.png';
const style = {
    height: '95%',
    width: '5%',
    marginRight: '2%',
    textAlign: 'center'
}

class TopToolbar extends Component {

    

    state = {
        ppimage: this.props.image
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.image !== prevProps.image){
            this.setState({
                ppimage: this.props.image
            })
            this.props.photoFinish();
        }
    }

    render () {

        let a = this.props.first_name.charAt(0);

        let sign = <Signing />
        if(this.props.isAuthenticated){
            sign = <div className={classes.afterlogin}>
            {this.props.image 
            ? <NavLink to="/Profile"><img className={classes.pp} src={this.state.ppimage} alt="pp"/> </NavLink>
            : <h4 style={{textAlign: "center"}}>{a}</h4> }
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

            <div className={classes.cartCont}>
                <div>
                <NavLink to="/cart">
                <h6 className={classes.items}>0</h6>

                <img src={shoppingCart} alt="Cart" className={classes.cart}/>
                </NavLink>
                </div>

                <div className={classes.dropdowndiv}>
                    Your Cart is Empty 
                    <br />
                    Keep Shopping
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
        image: state.auth.image
    };
};

const mapDispatchToProps = dispatch => {
    return {
        photoFinish: () => dispatch(actions.photoFinish())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);