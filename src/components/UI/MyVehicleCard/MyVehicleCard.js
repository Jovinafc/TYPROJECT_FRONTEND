import React from 'react';
import classes from './MyVehicleCard.module.css';

const MyVehicleCard = (props) => {
    return (
        <div className={classes.Container}>
            
            <div className={classes.div1}>

                 <div> <strong>{props.details.brand} {props.details.model} </strong></div>
                 <div className={classes.ImageCon}> <img className={classes.Image} alt="my" src={props.details.image}/> </div>
            
            </div>
            <div className={classes.div2}>
                   Posted On: {props.details.createdAt.substring(0,10)}
                <br/>
                
                   Vehicle Number {props.details.number_plate}
            </div>
        </div>
    );
}

export default MyVehicleCard;