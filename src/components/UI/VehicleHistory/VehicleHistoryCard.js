import React, {Component}  from 'react';
import classes from './VehicleHistoryCard.module.css';
import 'react-rater/lib/react-rater.css';
// import Modal from 'react-responsive-modal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect} from 'react-redux';
import axios from 'axios';
import ReactStars from 'react-stars'
import * as actions from '../../../store/actions/vehicle_click';
import * as actionp from '../../../store/actions/cart';


class VehicleHistoryCard extends Component {

    state = {
        modalShow:false,
        review: '',
        rating: 0,
        edit: true,
        disabled: false
        // review: '' || this.props.details.feedback['feedback_comment'] ,
        // rating: '' || this.props.details.rating['rating_number']     
    }

    componentDidMount = () => {
        // if(this.props.details.feedback['feedback_comment'] === null){
        //     this.setState({
        //         review: ''
        //     })
        // }

        // if( 'feedback' in this.props.details ){
        //     this.setState({
        //       review: this.props.details.feedback['feedback_comment']  
        //     })
        // }

        // if(this.props.details.has('feedback')){
        //     console.log('true');
        // }
        // console.log(this.props.details.vehicle_id);
        // if(this.props.details.rents.length > 0 ){
        //     console.log(this.props.details.rents[0].start_date);
        // }


        axios.get(`/get-vehicles?vehicle_id=${this.props.details.vehicle_id}&user_id=${localStorage.getItem('userId')}`)
        .then(res => {

            if(res.data.ratings.length > 0){
                if(res.data.ratings[0].rating_number !== undefined){
                    this.setState({
                        edit: false,
                        rating: res.data.ratings[0].rating_number,
                        
                    })    
                }
                else{
                    this.setState({
                        rating: 0,
                        edit: false
                    })
                }
            }
            else{
                this.setState({
                    edit: true,
                    rating: 0,
                    
                })
            }

            if(res.data.reviews.length > 0){
                if(res.data.reviews[0].feedback_comment !== undefined){
                    this.setState({
                        review: res.data.reviews[0].feedback_comment
                    })    
                }
                else {
                    this.setState({
                        review: ''
                    })
                }
                
                if(res.data.reviews[0].feedback_comment !== null||''){
                    this.setState({
                        disabled: true
                    })
                }
    
            }

            if(res.data.length < 0){
                if(res.data.ratings[0].rating_number !== undefined){
                    this.setState({
                        rating: res.data.ratings[0].rating_number
                    })    
                }
                else{
                    this.setState({
                        rating: 0
                    })
                }
    
                if(res.data.reviews[0].feedback_comment !== undefined){
                    this.setState({
                        review: res.data.reviews[0].feedback_comment
                    })    
                }
                else {
                    this.setState({
                        review: ''
                    })
                }
                
                if(res.data.reviews[0].feedback_comment !== null||''){
                    this.setState({
                        disabled: true
                    })
                }
    
            }
                   })


       
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
            // console.log(res);
            this.setState({
                modalShow: false
            })
        })
    }


    rateHandler = (value) => {
        console.log(value.rating);
    }

    cancelHandler = () =>{
        this.props.startLoading();

        axios.post('/cancel-booking', {owner_name: this.props.details.owner['name'], vehicle_id: this.props.details.vehicle_id, deposit: 5000, amount: this.props.details.amount,user_id:localStorage.getItem('userId'),client_bank_account_no: this.props.account_no})
        .then(res => {
            console.log(res);
            this.props.fetchVehicleHistory();
        })
        .catch(err => {
            console.log(err);
            this.props.stopLoading();

        })
    }

    render () {
        let modalClose = () => this.setState({ modalShow: false });
        // console.log(this.props.details.rents[0].start_date);
        // console.log(this.props.ratingDetails);
        // console.log(this.props.commentDetails);
        // console.log(this.props.details.owner['name']);

        return (

            <div className={classes.bigDiv}>
            <div className={classes.leftDiv}>
                <div className={classes.imageCont}> <img alt="Im" className={classes.Image} src= {this.props.details.vehicle['image']}></img></div>
            </div>
            <div className={classes.rightDiv}>
                <div className={classes.topRightDiv}>
                    <div>
                        <h5>{this.props.details.vehicle['brand']+ " " +this.props.details.vehicle['model']}</h5>
                    </div>
                    {this.props.details.vehicle['price'] 
                    ? <div><p><strong>Status:</strong> Purchased From {this.props.details.owner['name']}</p></div>
                    : <span> {this.props.details.status === "Rent Initiated"
                            ? <div><p><strong>Status</strong>: To be Rented From {this.props.details.owner['name']}</p></div>
                            : <div><p><strong>Status</strong>: Rented From {this.props.details.owner['name']} </p></div> }</span>
                    }
                    <div><p><strong>&#x20B9; Amount</strong> : {this.props.details.amount + 100}</p></div>
                    <div>{
                    this.props.details.rents.length > 0
                    ? <div><strong>Start Date</strong> : {this.props.details.rents[0].start_date.substring(0,10)}</div>
                    : null
                    } </div>

                    <div>{
                    this.props.details.rents.length > 0
                    ? <div><strong>End Date</strong> : {this.props.details.rents[0].end_date.substring(0,10)}</div>
                    : null
                    } </div>

                    
                </div>
                <div className={classes.downRightDiv}>
                    {
                        this.props.details.status === "Rent Initiated"    
                        ? null
                        : <div> {
                            this.state.review !== ''
                            ? <div> 
                                <button onClick={() => this.setState({ modalShow: true })}>
                                    Review Given
                                </button>
                            </div> 
                            : <div> 
                            <button onClick={() => this.setState({ modalShow: true })}>
                                Give your Review
                            </button>
                            </div> 

                          } </div>
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
                            : <img className={classes.pp} alt="Im" src={this.props.image}/>
                        }
                  </div>
                  <div><p>{this.props.fname +" "+ this.props.lname}</p></div>      
             </div>      
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Give your review</h5>
          <textarea style={{width: '100%'}}type="text" onChange={this.inputChangeHandler} disabled={this.state.disabled} value={this.state.review} rows="3"/>
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
                  
                 
                    {
                        this.props.details.status === "Rent Initiated"
                        ? null
                        : <div className={classes.rateDiv}>
                        {/* Rate Vehicle <Rater className={classes.rateCom} /> */}
                        <ReactStars
                        count={5}
                        onChange={this.ratingChanged}
                        size={24}
                        value={this.state.rating}
                        half={false}
                        edit={this.state.edit}

                        color2={'#ffd700'} />
                  </div>
                    }

                    {   
                        this.props.details.vehicle['price_per_day'] && this.props.details.status === 'Rent Initiated'
                        ? <div className={classes.cancelDiv} onClick={this.cancelHandler}><button>Cancel Booking</button> </div>
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
        lname : state.auth.last_name,
        account_no: state.auth.bank_account_no
    }    
}


const mapDispatchToProps = dispatch => {
    return {
        fetchVehicleHistory : () => dispatch(actions.fetchVehiclesHistory()),
        startLoading: () => dispatch(actionp.startLoading()),
        stopLoading: () => dispatch(actionp.stopLoading())

    }   
}


export default connect(mapStateToProps, mapDispatchToProps)(VehicleHistoryCard);