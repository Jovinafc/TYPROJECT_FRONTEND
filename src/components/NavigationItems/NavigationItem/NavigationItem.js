import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css'
import Radium from 'radium';


const navigationItem = (props) => {
    const style = {
        '@media (min-width: 500px)': {
           display: 'none'
        }
     }

    return (
    <li className={classes.NavigationItem} >
        <NavLink 
            to={props.link} 
            exact={props.exact}
            style={props.style}
            activeClassName={classes.active} >
            {props.children}
            
            
        </NavLink>
    </li>
    );
};

export default navigationItem;