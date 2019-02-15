import React,{Component} from 'react';
import classes from './VehicleDetail.module.css';
import { connect} from 'react-redux';
// import * as actions from '../../store/actions/vehicle_click';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
// import Login from '../Forms/Login/Login';
import Aux from '../../hoc/Auxilary';
import {DatePicker} from 'shineout';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import * as actionp from '../../store/actions/vehicle_click'


class VehicleDetail extends Component {

    state = {
        vehicles: {},
        show: false,
        user: false,
        showDate: false,
        startdatetime: '',
        enddatetime: '',
        Invalid: false

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
         axios.post(`/fetch-specific-vehicle/${a}`, {user_id: localStorage.getItem('userId')})
         .then(response => {
            console.log(response);
           if(response===null)
           {

           }
           else
           {
            this.setState({vehicles: response.data[0]});
            this.props.save_bank_account_no(response.data[1])
            this.props.fetch_selected_vehicle(response.data)
           }
         })
         .catch(err => {
             console.log(err);
             this.setState({Invalid: true})
         });

 }

     cancel = () => {
        this.setState({show: false});
    }

    startDateHandler = (e) => {
        this.setState({startdatetime: e});
        this.props.startDate(e);
    }

    endDateHandler = e => {
        this.setState({enddatetime: e});
        this.props.endDate(e);
    }
 
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
 
    render () {
        const sd = this.state.startdatetime;
        const ed = this.state.enddatetime;

        const enabled = sd.length > 0 && ed.length > 0;

        // let log = null;
        // log = <Login />
        
        let dc = null;
        dc = <div className={classes.DateContainer}>
        <form className="form-horizontal">
        <div className="form-group" >
            <label className="control-label col-sm-2" htmlFor="start">Start Date:</label> 
            <DatePicker id="start" placeholder="Start Date" format="yyyy-M-d HH:mm" type="datetime" value={this.state.startdatetime} onChange={this.startDateHandler}/>
            </div>
            <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="end">End Date:</label>
            <DatePicker id="end" placeholder="End Date" format="yyyy-M-d HH:mm" type="datetime" value={this.state.enddatetime} onChange={this.endDateHandler}/>
            </div>                    
            <br /> <br /> 
            <NavLink  to={'/payment/:'+this.props.vehicle_id}><button disabled={!enabled}  className="btn btn-danger">Proceed To Payment</button></NavLink>
            
        </form>
            
        </div>
        
        
        let vehicleDetail = (
            <div className={classes.InnerContainer}>
                
                <h3>{this.state.vehicles.brand} {this.state.vehicles.model}</h3> 
                {this.state.vehicles.price ? 
                <h6>Price: &#x20B9;{this.state.vehicles.price}</h6> : <h6>Price per day: &#x20B9;{this.state.vehicles.price_per_day}</h6>} 
                <img className={classes.Img} src={this.state.vehicles.image} alt="Vehicle"/>
                
                <div className={classes.Details}>
                    <h4>Other Details: </h4>
                    <table className={classes.tables}>
                        <tbody>
                        <tr className={classes.trs}>
                            <td className={classes.tds}>Model</td>
                            <td className={classes.tds}>{this.state.vehicles.model}</td>
                        </tr>

                        <tr className={classes.trs}>
                            <td className={classes.tds}>Year</td>
                            <td className={classes.tds}>{this.state.vehicles.year}</td>
                        </tr>

                        <tr className={classes.trs}>
                            <td className={classes.tds}>State</td>
                            <td className={classes.tds}>{this.state.vehicles.registration_state}</td>
                        </tr>

                        <tr className={classes.trs}>
                            <td className={classes.tds}>Kms Driven</td>
                            <td className={classes.tds}>{this.state.vehicles.km_driven}</td>
                        </tr>

                        <tr className={classes.trs}>
                            <td className={classes.tds}>Fuel Type</td>
                            <td className={classes.tds}>{this.state.vehicles.fuel_type}</td>
                        </tr>

                        <tr className={classes.trs}>
                            <td className={classes.tds}>Vehicle Number</td>
                            <td className={classes.tds}>{this.state.vehicles.number_plate}</td>
                        </tr>
                        </tbody>
                        
                    </table>
                </div>

                {/* <div className={classes.but}>
                    {this.state.vehicles.price 
                        ? <NavLink to={'/sellpayment/:'+this.props.vehicle_id}><button className="btn btn-primary">Buy Vehicle</button> </NavLink>
                        : <NavLink to={'/rentpayment/:'+this.props.vehicle_id}><button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button></NavLink>
                        }
                  </div> */}
                 
                 {/* {localStorage.getItem('token') === null
                 ? <div className={classes.but}>
                     <NavLink to="/login"><button className="btn btn-primary">Kindly Sign In</button></NavLink>
                   </div>  
                : <div className={classes.but}>
                     {this.state.vehicles.price 
                         ? <NavLink to={'/sellpayment/:'+this.props.vehicle_id}><button className="btn btn-primary">Buy Vehicle</button> </NavLink>
                         : <NavLink to={'/rentpayment/:'+this.props.vehicle_id}><button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button></NavLink>
                         }
                  </div> }                 */}

                {
                    localStorage.getItem('token') === null
                 
                 ? <div className={classes.but}>
                     <NavLink to="/login"><button className="btn btn-primary">Kindly Sign In</button></NavLink>
                   </div>  
               
                 : <div className={classes.but}>
                     {
                         this.state.vehicles.price 
                         
                         ? <div>
                             
                             {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                             ? <NavLink to="/Profile"><button className="btn btn-primary">Update your Profile</button></NavLink>

                             : <NavLink to={'/payment/:'+this.props.vehicle_id}><button className="btn btn-primary">Buy Vehicle</button> </NavLink>
                              
                             }  
                           </div> 
                           
                          : <div>

                               {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                               ? <NavLink to="/Profile"><button className="btn btn-success">Update your Profile</button></NavLink>

                   //            : <NavLink to={'/rentpayment/:'+this.props.vehicle_id}><button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button></NavLink>
                               : <button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button>

                                }
                            </div> 
                         
                        //  <NavLink to={'/sellpayment/:'+this.props.vehicle_id}><button className="btn btn-primary">Buy Vehicle</button> </NavLink>
                         
                        //  : <NavLink to={'/rentpayment/:'+this.props.vehicle_id}><button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button></NavLink>
                         
                     }
                 
                  </div> 
               
               }                
       


                {/* <div className={classes.but}>
                {this.state.vehicles.price 
                ? <button onClick={this.buyVehicleHandler} className="btn btn-primary">Buy Vehicle</button> 
                : <button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button>
  
                }
                </div> */}


                {
                    this.state.showDate === true ? dc : null
                }

            </div>
        );

        

        return (
            <Aux>
         

            {this.state.Invalid === true 
            ?  <div className={classes.Container}> <h2> Error 404</h2> </div> 
            : <div className={classes.Container}>
                             
                <h2>Vehicle Details</h2> 
                {vehicleDetail} 
            </div> }
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
        save_bank_account_no : (bank_no) => dispatch(actionp.save_owner_bank_account_no(bank_no))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);