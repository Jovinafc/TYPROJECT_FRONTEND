import React, {Component} from 'react';
import classes from './VehicleReviewDiv.module.css';
import ReactStars from 'react-stars';

class VehicleReviewDiv extends Component {
    render () {

        let rateDiv = <div>{this.props.details.rating 
                        ?   <ReactStars
                        count={5}
                        size={24}
                        value={this.props.details.rating}
                        half={false}
                        edit={false}
                        color2={'#ffd700'} />
                        : <div>Not Rated by user</div>
                        }
                         
                         </div>



        console.log(this.props.details);
        console.log(this.props.details2);
        
        console.log(this.props.details.user['first_name'].charAt(0));

        let a = this.props.details.user['first_name'].charAt(0);

        return (
            <div className={classes.mainDiv}>   
                <div className={classes.topDiv}>
                    <div className={classes.imageContainer}>
                        {this.props.details.user['image']
                        ? <img className={classes.image} src={this.props.details.user['image']} alt="pfimage" />
                        : <h2 style={{textAlign: "center", fontSize: '20px', color: "black"}}>{a}</h2>}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p>{this.props.details.user['first_name'] +" "+ this.props.details.user['last_name']}</p>
                        <span>{this.props.details.createdAt.substring(0,8)}</span>
                    </div>      

                    <div className={classes.ratingDiv}>
                        {rateDiv}
                    </div>
                        
                </div>
                <div className={classes.downDiv}>
                    <textarea value={this.props.details.review || ''} style={{width: '100%', height: 'auto'}}type="text" disabled={true}/>
                    
                    <div className={classes.thumbs}>
                    <div className={classes.thumbupdown}>
                    <i className="fas fa-thumbs-up"></i>
                    Helpful
                    </div>

                    <div>
                    <i className="fas fa-thumbs-down"></i>
                    Not Helpful
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VehicleReviewDiv;