import React, { Component} from 'react';
import classes from './Help.module.css';

class Help extends Component {
    render () {

        return (
            <div>
                <div className={classes.main}>
                    <div className={classes.helpone}>
                        <h4 className={classes.header}>Buy/Rent Process</h4>
                        <div>
                            <ul>
                                <li> Make sure you have logged in before you proceed to buy or rent a vehicle  </li>
                                <li> Make Sure your User Profile is updated </li>
                                <li> For Buying a Vehicle the procedure is simple, click the buy vehicle button and then enter your credit or debit card details and then proceed further you will get an OTP message on your Email Id</li>
                                <li>For Renting a Vehicle start by entering the Start Date(i.e Date on which you want to rent the vehicle) and then the End Date(i.e Date on which you will return the vehicle to its owner) </li>
                                <li>For rent you will have to pay a deposit of Rs 5000 along with the price per day amount which will be based on the number of days you plan to rent the vehicle</li>    
                            </ul>
                        </div>
                    </div>
                
                    <div className={classes.helpone}>
                        <h4 className={classes.header}>Sell/Lend Process</h4>
                        <div>
                            <ul>
                                <li> Make sure you have logged in before you proceed to rent or lend a vehicle  </li>
                                <li> Make Sure your User Profile is updated </li>
                                <li> For Selling a vehicle make sure you enter all the vehicle details properly. You won't be able to submit the form until you enter all the fields</li>
                                <li> The lend process is similar to the selling process. The only differene here is that you enter Price Per Day(i.e the amount of money you want to charge on your vehicle per day) </li>
                                <li>Kindly make sure you upload a proper and clear image of the vehicle and the vehicle document</li>    
                            </ul>
                        </div>
                    </div>
                </div>    

            </div>

        )
    }
}

export default Help;