import React, {Component} from 'react';
import classes from './VehicleHistory.module.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider';


class VehicleHistory extends Component {
    render () {
        
        return (
            <div className={classes.Container}>
                No History! 
                <ImageSlider />

        
            </div>

        );  
    }
}

export default VehicleHistory;