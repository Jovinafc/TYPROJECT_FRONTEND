import React, { Component} from 'react';
import classes from './HomePage.module.css';
import Image from './Vehicle.v1.jpg';

class HomePage extends Component {
    render () {
        return (
            <div>
                <div className={classes.container}>
                <img className={classes.img} src={Image} alt="Vehicle"/>

                    <div className={classes.margin}>
                        <button className={classes.b1}>Sell Now</button>
                        <button className={classes.b2}>Lend Now</button>
                        <br />
                        <button className={classes.b3}>Rent Now</button>
                        <button className={classes.b4}>Buy Now</button>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default HomePage;