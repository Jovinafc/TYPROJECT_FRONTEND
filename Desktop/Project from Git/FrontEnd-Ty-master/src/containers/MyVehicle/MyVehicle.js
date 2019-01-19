import React, { Component} from 'react';
import classes from './MyVehicle.module.css';

class MyVehicle extends Component {
    render () {
        return (
            <div className={classes.Container}>
                <p>No Vehicles to Show</p>

            </div>
        );
    }
}

export default MyVehicle;