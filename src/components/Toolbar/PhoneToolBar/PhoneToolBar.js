import React, {Component} from 'react';
import classes from './PhoneToolBar.module.css';
import {StyleRoot } from 'radium';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions/auth';


const style = {
    '@media (min-width: 500px)': {
       display: 'none',
       border: '1px solid black',
       height: '55px'
    }
    
 }

class PhoneToolbar extends Component {

    state = {
        zero: 0
    }
    render () {
        
     return (
        <StyleRoot >

            
            <div style={style} >
                <div className={classes.phoneDiv}>
                    <div className={classes.cart}>  
                    <NavLink to="/cart"> 
                    <IconButton aria-label="Cart">
                    {this.props.isAuthenticated
                    ?  <Badge badgeContent={this.props.item_number} color="primary"  >
                            <i style={{color: 'black', fontSize: '1.3rem'}} className="fas fa-shopping-cart"></i>
                        </Badge>
                
                    
                    : <Badge  badgeContent={this.state.zero} color="primary" >
                            <i style={{color: 'black', fontSize: '1.3rem'}} className="fas fa-shopping-cart"></i>
                    </Badge>
                    }
                    </IconButton>
                    </NavLink>
                    </div>
                    
                    <div className={classes.imageCont}>
                        {this.props.image
                        ? <img  className={classes.image} src={this.props.image} alt="Im"/> 
                        : <h2 style={{textAlign: "center",color: "white"}}>{this.props.first_name.charAt(0)}</h2> }
                        
                    </div>
                </div>
        </div>
        </StyleRoot >
    
     )

                }
};

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


export default connect(mapStateToProps, mapDispatchToProps)(PhoneToolbar);