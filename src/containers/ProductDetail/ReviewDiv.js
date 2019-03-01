import React, {Component} from 'react';
import classes from './ReviewDiv.module.css';

class ReviewDiv extends Component {
    render () {
        return (
            <div className={classes.mainDiv}>   
                <div className={classes.topDiv}>
                    <div className={classes.imageContainer}>

                        <img className={classes.image} src={} alt="pfimage" />
                    </div>
                    <div><p>{this.props.fname +" "+ this.props.lname}</p></div>      

                </div>
                <div className={classes.downDiv}>
                    <input type="text" disabled value={}/>
                </div>
            </div>
        )
    }
}

export default ReviewDiv;