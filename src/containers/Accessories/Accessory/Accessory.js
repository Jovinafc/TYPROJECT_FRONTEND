import React, { Component } from 'react';
import classes from './Accessory.module.css';
import {NavLink } from 'react-router-dom';

class Accessory extends Component {
    
    render () {
        return (
            <div className={classes.CardContainer}>
                <div className={classes.Card}>
                    <div className={classes.ImageContainer}>
                        <img className={classes.Image}src={this.props.image} alt="Im"/>
                    </div>

                    <div className={classes.content}>
                    <h5 onClick={() => this.props.onCardClick(this.props.productId)}><NavLink to={'/productdetail/:'+this.props.productId}><strong>{this.props.name}</strong></NavLink></h5>

                    <h6>{this.props.price}</h6>

                    <button className="btn btn-success">Add to Cart</button>

                    </div>
                    

                </div>
            </div>
        );
    }
}

export default Accessory;
