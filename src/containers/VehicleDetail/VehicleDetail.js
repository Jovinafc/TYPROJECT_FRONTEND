import React,{Component} from 'react';
import classes from './VehicleDetail.module.css';
import { connect} from 'react-redux';
// import * as actions from '../../store/actions/vehicle_click';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
// import Login from '../Forms/Login/Login';
import Aux from '../../hoc/Auxilary';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import * as actionp from '../../store/actions/vehicle_click'
import Datetime from 'react-datetime';
import moment, * as moments from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import './react-datetime.css';
import VehicleReviewDiv from './VehicleReviewDiv';

class VehicleDetail extends Component {

    state = {
        vehicles: {},
        owner: {},
        show: false,
        user: false,
        showDate: false,        
        startdatetime: '',
        enddatetime: '',
        Invalid: false,
        postedOn: '',
        moment: moment(),
        start: '',
        end: '',
        days: 1,
        reviewsArray: [],
        noReviews: false,
        startDateError: '',
        endDateError: '',
        depositAmount: 5000
    }


    buyVehicleHandler = () => {
        if(this.props.user_id === null){
            alert("Kindly Login")
            // this.setState({
            //     user: false,
            //     show: true    
            // })
        }
        

        let vehicles = {
            client_id: this.props.user_id, 
            vehicle_id: this.state.vehicles.vehicle_id,
        }

        axios.post('/buy-now' , {vehicles: vehicles})
        .then(res => {
            console.log(res);
            alert("Sold")
        });
    }

    handleChange = (moment) => {
        this.setState({
          moment
        });
      }

    

    lendHandler = (e) => {
        this.setState(oldState => ({showDate: !oldState.showDate}));
    }
    
     componentDidMount () {
        window.scrollTo(0, 0);

        // if(localStorage.getItem('token')){
        //     const expiry = localStorage.getItem('expirationDate');
        //   let d1 = new Date(expiry);
        //   let d2 = new Date();
          
          
        //   let d3 = d1.getTime();
        //   let d4 = d2.getTime();
        //   let d5 = d3-d4;
        //   //305000
        //   if(d5<3405000)
        //   {
        //       console.log("LogOut")
        //       console.log(localStorage.getItem('userId'));
        //       this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('userId'))
        //       // setTimeout(this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('token')), 0)
        //       // this.props.getTokens(this.props.email, this.props.user_id);
        //   }
        // }
        // console.log(this.props.vehicle_id);
        const {match: {params}} = this.props;
        let a = params.vehicle_id;
        a = a.substring(1);

        //  axios.post(`/fetch-specific-vehicle/${a}', {user_id: this.props.user_id})   
         axios.post(`/fetch-specific-vehicle`, {user_id: localStorage.getItem('userId'), vehicle_id: a})
         .then(response => {
            console.log(response.data);
           if(response===null)
           {

           }
           else
           {
            this.setState({
                vehicles: response.data[0],
                owner: response.data[0].owner
            });
            console.log(response.data[0].owner.name);
            this.setState({postedOn: response.data[0].createdAt.substring(0,10)})
            this.props.save_bank_account_no(response.data[1])
            this.props.fetch_selected_vehicle(response.data)
           }
         })
         .catch(err => {
             console.log(err);
             console.log(err.response.data)
             this.setState({Invalid: true})
         });


         axios.get(`/fetch-vehicle-comments-and-ratings/${a}`)
         .then(res => {
             console.log(res.data);
                if(res.data === 'No reviews'){
                    this.setState({
                        noReviews: true
                    })   
                }
                else {
                    const hist = [];
                 for(let key in res.data){
                     hist.push({
                         ...res.data[key],
                         id: key
                     });
                 }

                 console.log(hist);
                 this.setState({
                    reviewsArray: hist
                 })
             
                }
                 
         })
 }

     cancel = () => {
        this.setState({show: false});
    }

    // startDateHandler = (e) => {
    //     this.setState({startdatetime: e});
    //     this.props.startDate(e);
    // }

    // endDateHandler = e => {
    //     this.setState({enddatetime: e});
    //     console.log(e);
    //     this.props.endDate(e);
    // }
 
    proceedHandler = (e) => {
        e.preventDefault();
        axios.post('/rent-now', {user_client_id: this.props.user_id, 
                        vehicle_id: this.state.vehicles.vehicle_id,
                        start_date: this.state.startdatetime,
                        end_date: this.state.enddatetime})
        .then(response => {
            
            console.log(response);
            alert("Rented")
            this.setState({
                startdatetime : '',
                enddatetime: ''
            })
        })
    }

    logHandler = () => {
        this.setState({show: true});
    }

    cancel = () => {
        this.setState({show: false});
    }

    dateHandler = () => {

    }
 
    starth = (moment) => {
        console.log(moment);
        let s = moments(moment._d).format('YYYY-MM-DD HH:mm');
        console.log(s);
        this.setState({
            start: s
        })
        this.props.startDate(s);
        // moment(e._d).format()
    }

    endh = (moment) => {
        console.log(moment);
        let s = moments(moment._d).format('YYYY-MM-DD HH:mm');
        console.log(s);
        this.setState({
            end: s
        }, () => {
               let sd = this.state.start;
               let ed = this.state.end;
               console.log(sd);
               console.log(ed); 

               let s = sd.substring(8,10);
               console.log(s)
               let e = ed.substring(8,10);
               console.log(e);
               console.log(e-s);
               if(e-s == 0){
                   this.setState({
                       days: 1
                   })
               }
               else {
               this.setState({
                   days: e - s
               })
            }
            // let sd = moments(this.state.start);
            // let ed = moments(this.state.end);
            // let duration = moments.duration(ed.diff(sd));
            // let days = duration.asDays();
            // this.setState({
            //     days: days
            // })
        });

        this.props.endDate(s);

    }

    
    render () {

        let yesterday = Datetime.moment().subtract(1, 'day');
        let valid = function(current){
            return current.isAfter(yesterday);
        };
        // console.log(this.state.start);
        // console.log(this.state.end);
        console.log(this.state.vehicles);

        let reviewlist = null;

        console.log(this.state.reviewsArray);


        if(this.state.noReviews === false){
            
        reviewlist = this.state.reviewsArray.map(dis => {
            return (
            <VehicleReviewDiv 
            key={dis.id}
            details = {dis}
            
            />
            )

        })

        }


        const sd = this.state.start;
        const ed = this.state.end;

        const enabled = sd.length > 0 && ed.length > 0;

        // let log = null;
        // log = <Login />
        
        let datepickers = null;
        if(this.state.vehicles.price_per_day){
            datepickers = <div className={classes.date}>
                                <p style={{marginBottom: '-3px'}}>Start Date</p>
                                <Datetime isValidDate={valid} className={classes.modernDiv} style={{width: '60%'}} onChange={this.starth}/>  
                                <span>{this.state.startDateError}</span>
                                <p style={{marginBottom: '-3px'}}>End Date</p>
                               <Datetime isValidDate={valid} className={classes.modernDiv}  onChange={this.endh}/>
                                <span>{this.state.endDateError}</span>
                          </div>
        }
        
        // console.log(this.state.vehicles.owner.name);
               console.log(this.state.owner);

        return (
            <Aux>
         

            {this.state.Invalid === true 
            ?  <div className={classes.Container}> <h2> Error 404</h2> </div> 
            :  <div className={classes.Container}>
                                             
                <div className={classes.firstCont}>
                    <div className={classes.leftdiv}>
                             <div className={classes.image}>
                                 <img className={classes.img} src={this.state.vehicles.image}/>
                             </div>
                             <div className={classes.details}>
                                  <strong>Details</strong>
                                  <div className={classes.innerdetails}>
                                 <div> <p>Brand: {this.state.vehicles.brand}</p> </div> 
                                 <div> <p>Model: {this.state.vehicles.model} </p> </div>
                                 <div> <p>Year: {this.state.vehicles.year} </p></div>
                                 <div> <p>Km Driven: {this.state.vehicles.km_driven} </p></div> 
                                 <div> <p>State: {this.state.vehicles.registration_state} </p></div>
                                 <div> <p>Fuel Type: {this.state.vehicles.fuel_type} </p></div> 
                                 <div> <p>Vehicle Number: {this.state.vehicles.number_plate} </p></div>  
                                 {/* <div> <p>Posted On: {this.state.vehicles.createdAt} </p></div>  */}

                                 </div>
                             </div>
                    </div>

                    <div className={classes.rightdiv}>
                        <div className={classes.price}>
                            {this.state.vehicles.price ? 
                            <h6>Price: &#x20B9;{this.state.vehicles.price.toLocaleString('en-IN')}</h6> : <h6>Price per day: &#x20B9;{this.state.vehicles.price_per_day}</h6>} 
                            <div> <p>{this.state.vehicles.brand} {this.state.vehicles.model}</p> </div>  
                            <div> Ad Posted On: {this.state.postedOn}</div>    
                            <div>Owner:{this.state.owner.name}</div>    
                            <div> {datepickers} </div>
                            <div className={classes.buttonCont}>
                            {
                    localStorage.getItem('token') === null
                 
                 ? <div className={classes.but}>
                     <NavLink to="/login"><button className="btn btn-primary">Kindly Sign In</button></NavLink>
                   </div>  
               
                 : <div className={classes.but}>
                     {  
                         this.state.vehicles.price 
                         
                         ? <div className={classes.but}>
                             
                             {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                             ? <NavLink to="/Profile"><button className="btn btn-primary">Update your Profile</button></NavLink>

                             : <NavLink to={'/payment/:'+this.props.vehicle_id}><button className="btn btn-primary">Buy Vehicle</button> </NavLink>
                              
                             }  
                           </div> 
                           
                          : <div className={classes.but}>

                               {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                               ? <NavLink to="/Profile"><button className="btn btn-success">Update your Profile</button></NavLink>

                   //            : <NavLink to={'/rentpayment/:'+this.props.vehicle_id}><button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button></NavLink>
                               : <NavLink to={'/payment/:'+this.props.vehicle_id}>
                                   <button 
                                   disabled={!enabled}
                                //    onClick={this.lendHandler} 
                               className="btn btn-success">Rent Vehicle</button></NavLink>

                                }
                            </div> 
                         
                        //  <NavLink to={'/sellpayment/:'+this.props.vehicle_id}><button className="btn btn-primary">Buy Vehicle</button> </NavLink>
                         
                        //  : <NavLink to={'/rentpayment/:'+this.props.vehicle_id}><button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button></NavLink>
                         
                     }
                 
                  </div> 
               
               }           

                            <div style={{marginLeft:'5px'}}>
                                {!this.state.vehicles.price 
                                ? <div style={{ width: '100%', height: '80%'}}><p style={{fontSize: '0.8em', marginTop: '10%'}}>A deposit of &#x20B9; 5000 will be taken.
                                {this.state.depositAmount} + {this.state.vehicles.price_per_day * this.state.days} = {this.state.vehicles.price_per_day* this.state.days + 5000}
                                </p></div>
                                : null }
                            </div>
                            </div>    
                            
                        </div>
                    </div>
                </div>  
                {/* {vehicleDetail}  */}
            </div> }

            {
                this.state.noReviews
                ? null
                : <div className={classes.reviewsCont}>
                Reviews 
                {reviewlist}
           </div>

            }
            
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        vehicle_id: state.vehicle.vehicle_id,
        vehicles: state.vehicle.vehicles,
        user_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        address: state.auth.address,
        state: state.auth.state,
        city: state.auth.city,
        pincode: state.auth.pincode,
        number : state.auth.phone_number
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getTokens: (email,user_id) => dispatch(actions.authRefresh(email,user_id)),
        startDate: (startDate) => dispatch(actionp.startDate(startDate)),
        endDate: (endDate) => dispatch(actionp.endDate(endDate)),
        fetch_selected_vehicle: (vehicle) => dispatch(actionp.fetch_selected_vehicle(vehicle)),
        save_bank_account_no : (bank_no) => dispatch(actionp.save_owner_bank_account_no(bank_no)),
        no_of_days: (start,end) => dispatch(actionp.no_of_days(start,end))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);