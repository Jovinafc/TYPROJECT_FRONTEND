import React, {Component}  from 'react';
import classes from './VehicleHistoryCard.module.css';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css';
// import Modal from 'react-responsive-modal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect} from 'react-redux';
import axios from 'axios';
import ReactStars from 'react-stars'


class VehicleHistoryCard extends Component {

    state = {
        modalShow:false,
        review: '',
        rating: 0 
    }

    inputChangeHandler = (e) => {
        this.setState({
            review: e.target.value
        })
    }

    ratingChanged = (newRating) => {
        this.setState({
            rating: newRating
        }, () => {
            axios.post('/rating', {
                user_id: localStorage.getItem('userId'),
                user_name: this.props.fname+ ''+ this.props.lname,
                vehicle_name: this.props.details.vehicle['brand']+ ''+ this.props.details.vehicle['model'],
                vehicle_id: this.props.details.vehicle_id,
                rating_number: newRating
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

    submitHandler = (e) => {
        axios.post('/create-comment', {
            user_id: localStorage.getItem('userId'),
            user_name: this.props.fname+ ''+ this.props.lname,
            vehicle_name: this.props.details.vehicle['brand']+ ''+ this.props.details.vehicle['model'],
            vehicle_id: this.props.details.vehicle_id,
            feedback_comment: this.state.review
        })
        .then(res => {
            console.log(res);
        })
    }


    rateHandler = (value) => {
        console.log(value.rating);
    }

    render () {

        let modalClose = () => this.setState({ modalShow: false });


        return (

            <div className={classes.bigDiv}>
            <div className={classes.leftDiv}>
                <div className={classes.imageCont}> <img className={classes.Image} src= {this.props.details.vehicle['image']}></img></div>
            </div>
            <div className={classes.rightDiv}>
                <div className={classes.topRightDiv}>
                    {this.props.details.vehicle['price'] 
                    ? <div><p>Purchased From {this.props.details.to}</p></div>
                    : <div><p>Rented From {this.props.details.to}</p></div>
                    }
                    <div><p>Amount {this.props.details.amount}</p></div>
                    <div></div>
                </div>
                <div className={classes.downRightDiv}>
                    {
                        this.props.details.vehicle['price_per_day']
                        ? <div> <button onClick={() => this.setState({ modalShow: true })}
                        >Give your Review</button></div>
                        : <div> <button onClick={() => this.setState({ modalShow: true })}
                        >Give your Review</button></div> 
                    }

        <Modal
        show={this.state.modalShow}
        onHide={modalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
                 <div className={classes.modalHeader}>
                  <div className={classes.round}> {
                            this.props.image === null
                            ? <h2 style={{textAlign: "center",color: "black", }}>{this.props.fname.charAt(0)} </h2>
                            : <img className={classes.pp} src={this.props.image}/>
                        }
                  </div>
                  <div><p>{this.props.fname +" "+ this.props.lname}</p></div>      
             </div>      
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Give your review</h5>
          <textarea rows="5" style={{width: '100%'}}type="text" onChange={this.inputChangeHandler} rows="3"/>
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={this.submitHandler}>Save</Button>
        </Modal.Footer>
      </Modal>
                  
                    {/* {
                        this.props.details.vehicle['price_per_day']
                        ? <div className={classes.rateDiv}> Rate Vehicle Experience
                            <button>Rate Vehicle Experience</button>
                            <span className={classes.rate}>Rate Vehicle</span>
                          </div>
                        : <div className={classes.rateDiv}> 
                            <span className={classes.rate}>
                            <Rater className={classes.rateCom} onRate={this.rateHandler} total={5} rating={this.state.rating} />
                            </span>
                           </div> 
                    } */}

                    {
                        this.props.details.vehicle['price_per_day']
                        ? <div className={classes.rateDiv}>
                                {/* Rate Vehicle <Rater className={classes.rateCom} /> */}
                                <ReactStars
                                count={5}
                                onChange={this.ratingChanged}
                                size={24}
                                value={this.state.rating}
                                half={false}
                                color2={'#ffd700'} />
                          </div>
                        : <div className={classes.rateDiv}>
                                 {/* Rate Vehicle <Rater className={classes.rateCom}/> */}
                                 <ReactStars
                                count={5}
                                onChange={this.ratingChanged}
                                size={24}
                                value={this.state.rating}
                                half={false}
                                color2={'#ffd700'} />                                
                          </div>
                    }

                    {   
                        this.props.details.vehicle['price_per_day']
                        ? <div className={classes.cancelDiv}><button>Cancel Vehicle</button> </div>
                        : null
                    }
                    
                </div>
            </div>
        </div>

            );
    }
        
}

const mapStateToProps = state => {
    return {
        image : state.auth.image,
        fname : state.auth.first_name,
        lname : state.auth.last_name
    }    
}

export default connect(mapStateToProps, null)(VehicleHistoryCard);