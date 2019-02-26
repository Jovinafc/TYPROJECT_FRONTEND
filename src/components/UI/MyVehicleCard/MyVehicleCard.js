import React from 'react';
import classes from './MyVehicleCard.module.css';

const MyVehicleCard = (props) => {


    return (
        <div className={classes.Container}>
            
            <div className={classes.div1}>

                 {/* <div> <strong>{props.details.brand} {props.details.model} </strong></div> */}
                 <div className={classes.ImageCon}> <img className={classes.Image} alt="my" src={props.details.image}/> </div>
            
            </div>
            {/* <div className={classes.div2}>
                   <div><p><strong>Details:</strong></p></div>
                   <div><p>Posted On: {props.details.createdAt.substring(0,10)}</p></div>
                   <div><p>Vehicle Number: {props.details.number_plate}</p></div>
                   <div><p>Fuel Type: {props.details.fuel_type}</p></div>
                   <div><p>Registration State: {props.details.registration_state}</p></div>
                   <div><p>Vehicle Type: {props.details.vehicle_type}</p></div>
                   
                   
            </div>
            <div>
            {
                       props.details.price 
                       ? <div><p>Price: {props.details.price}</p></div>
                       : <div><p>Price Per Day: {props.details.price_per_day}</p></div>
                   }
                <div><p>Vehicle Status : {props.details.status}</p></div>
                <div><button className="btn btn-danger">Remove Vehicle</button></div>
            
            </div> */}

            <div className={classes.rightDiv}>
                 <div className={classes.topRightDiv}>
                    <div><p><strong>{props.details.brand} {props.details.model}</strong></p></div>
                    <div><p>Status: {props.details.status}</p></div>
                </div>
                <div className={classes.details}>
                   <div><p>Posted On: {props.details.createdAt.substring(0,10)}</p></div>
                   <div><p>Vehicle Number: {props.details.number_plate}</p></div>
                   <div><p>Fuel Type: {props.details.fuel_type}</p></div>
                   <div><p>Registration State: {props.details.registration_state}</p></div>
                   <div><p>Vehicle Type: {props.details.vehicle_type}</p></div>
                   {
                       props.details.price 
                       ? <div><p>Price: {props.details.price}</p></div>
                       : <div><p>Price Per Day: {props.details.price_per_day}</p></div>
                   }

             </div>
             <div className={classes.downRightDiv}>
                  {props.details.status !== 'SOLD'
                  ? <div><button  className="btn btn-danger">Remove Vehicle</button></div>
                  : <div><p>Your Vehicle was sold to </p> </div>
                } 
             </div>

            </div>
        </div>
    );
}

export default MyVehicleCard;