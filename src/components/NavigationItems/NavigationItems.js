import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>  (
  
  
    //    let login = null;

      //  login = <Login />
        
            
            <ul className={classes.NavigationItems}>
            <NavigationItem  exact link="/">Home </NavigationItem>
            {/* <NavigationItem  link="/signin"> Sign In </NavigationItem>
             */}
            <NavigationItem link="/display" >Buy/Rent Vehicle 
                </NavigationItem>
            {/*     
            <NavigationItem link="/sell">Sell/Lend Vehicle</NavigationItem> 
             <NavigationItem  link="/logout">Logout</NavigationItem> 
            */}
                
             {!props.isAuthenticated 
                ? <NavigationItem link="/signin">Sign In</NavigationItem>
                : null }

             {props.isAuthenticated 
                ? <NavigationItem link="/sell">Sell/Lend Vehicle</NavigationItem> 
                : null}
             {props.isAuthenticated 
                ? <NavigationItem link="/logout">Logout</NavigationItem> 
                : null}
             

        </ul>   
);
                
      //  <Modal show={this.state.show} modalClosed={this.cancelHandler}>
      //      {login}
      //  </Modal>
        
        
        
    

export default navigationItems;