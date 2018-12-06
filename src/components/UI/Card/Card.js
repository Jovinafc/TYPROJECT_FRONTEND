import React from 'react';
import classes from './Card.module.css'

const card = (props) => {
    return (
        <div className={classes.CardContainer}>
            <div className={classes.Card}>
                <div className={classes.Image}>
                    {props.image}
                </div>
                <div className={classes.content}>
                    <h5><strong>{props.name}</strong>{props.model}</h5>
                    <h6>&#x20B9;{props.price}</h6>
                </div>
                {props.image}
            </div>
        </div>
    );
}

export default card;    

//import React from 'react';
//import classes from './Card.module.css';
//
//const card = (props) => {
//    return (
//        <div className={classes.card}>
//                
//                <div className={classes.img}>Image</div>
//                <div className={classes.vehicledetails}></div>    
//        </div>
//    )
//};
//
//export default card;
//