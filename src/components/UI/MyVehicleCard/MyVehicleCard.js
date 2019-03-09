import React, { Component } from 'react';
import classes from './MyVehicleCard.module.css';
import axios from 'axios';

class MyVehicleCard extends Component {

    removeVehicle = () => {
        axios.post('/remove-vehicle', {user_id: localStorage.getItem('userId'), vehicle_id: this.props.details.vehicle_id})
        .then(res => {
            console.log(res.data);
        })
    }

    render () {
        return (
            
        <div className={classes.Container}>
            
        <div className={classes.div1}>

             {/* <div> <strong>{props.details.brand} {props.details.model} </strong></div> */}
             <div className={classes.ImageCon}> <img className={classes.Image} alt="my" src={this.props.details.image}/> </div>
        
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
                <div><p><strong>{this.props.details.brand} {this.props.details.model}</strong></p></div>
                <div><p>Status: {this.props.details.status}</p></div>
            </div>
            <div className={classes.details}>
               <div><p>Posted On: {this.props.details.createdAt.substring(0,10)}</p></div>
               <div><p>Vehicle Number: {this.props.details.number_plate}</p></div>
               <div><p>Fuel Type: {this.props.details.fuel_type}</p></div>
               <div><p>Registration State: {this.props.details.registration_state}</p></div>
               <div><p>Vehicle Type: {this.props.details.vehicle_type}</p></div>
               {
                   this.props.details.price 
                   ? <div><p>Price: {this.props.details.price}</p></div>
                   : <div><p>Price Per Day: {this.props.details.price_per_day}</p></div>
               }

         </div>
         <div className={classes.downRightDiv}>
              {this.props.details.status !== 'SOLD' && this.props.details.status !== 'RENTED' 
              ? <div><button onClick={this.removeVehicle} className="btn btn-danger">Remove Vehicle</button></div>
              : <div>
                    {this.props.details.status === 'RENTED'
                    ? <div><p>Your Vehicle is currently rented to {this.props.details.client['name']}</p> </div>
                    : <div><p>Your Vehicle was sold to {this.props.details.client['name']}</p> </div>}    
                </div>    
            } 
         </div>

        </div>
    </div>
        )
    }
} 



export default MyVehicleCard;