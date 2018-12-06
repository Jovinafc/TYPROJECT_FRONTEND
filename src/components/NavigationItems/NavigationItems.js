import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';



const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem  exact link="/">Home </NavigationItem>
        <NavigationItem link="/signin"> Sign In </NavigationItem>
        <NavigationItem link="/display" >Buy/Rent Vehicle 
            </NavigationItem>
        <NavigationItem link="/sell">Sell/Lend Vehicle </NavigationItem>
        
    </ul>
);

export default navigationItems;