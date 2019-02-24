import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import {StyleRoot } from 'radium';


const toolbar = (props) => {
    const style = {
        '@media (min-width: 500px)': {
           display: 'none',
           border: '1px solid black',
           height: '55px',
           padding: '-5%'
        }
        
     }

     return (
        <StyleRoot >

    <div className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>

        <div style={style} >
            <div className={classes.phoneDiv}>
                <div>Cart  kfjnfiwhih     </div>
                <div>Image</div>
            </div>
        </div>
    </div>
    </StyleRoot >

     )
};

export default toolbar;


