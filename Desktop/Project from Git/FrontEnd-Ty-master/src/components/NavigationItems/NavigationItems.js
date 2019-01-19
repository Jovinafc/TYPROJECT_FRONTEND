import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';
import {StyleRoot } from 'radium';


const navigationItems = (props) =>  {
            const style = {
               '@media (min-width: 500px)': {
                  display: 'none'
               }
            }
  
    //    let login = null;
         
      //  login = <Login />
            return (
            <StyleRoot >

            <ul className={classes.NavigationItems}>
            <NavigationItem  exact link="/">Home </NavigationItem>
            {/* <NavigationItem  link="/signin"> Sign In </NavigationItem>
             */}

             <span style={style} className={classes.span}>
             {props.isAuthenticated
               ? <NavigationItem  link="/profile">My Profile</NavigationItem>
               : null}
             </span>

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
        </StyleRoot>

            )

   };
                
      //  <Modal show={this.state.show} modalClosed={this.cancelHandler}>
      //      {login}
      //  </Modal>
        
        
        
    

export default navigationItems;