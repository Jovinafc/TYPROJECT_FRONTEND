import React, {Component} from 'react';
import classes from './Success.module.css';
import { Redirect } from 'react-router-dom';
import Countdown from "react-countdown-now";
import './success.css';
import {Animated} from "react-animated-css";


class Success extends Component {
    
    render (){

        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a complete state
              return <Redirect to="/" />;
            } else {
              // Render a countdown
              return <span>{seconds}</span>;
            }
          };

        return (
            <div className={classes.Container}>
               
               <div>
                     
                    <Animated animationIn="bounce" animationOut="zoomOutDown" isVisible={true}>
                        <h3>Payment Successful</h3> 
                    </Animated> 
                    {/* <h3>Payment Successful</h3>  */}
                    <p>(Redirecting to the homepage in <Countdown date={Date.now() + 10000} renderer={renderer} /> seconds )</p>  
                     
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                    </svg>
                      {/* <Animated animationIn="bounce" animationOut="zoomOutDown" isVisible={true}>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle className="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                    <polyline className="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                    </svg>
                      </Animated>
                       */}

                   
                </div> 
            </div>
        );
    }
}

export default Success;
 
