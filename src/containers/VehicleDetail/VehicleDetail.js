import React,{Component} from 'react';
import classes from './VehicleDetail.module.css';
import { connect} from 'react-redux';
// import * as actions from '../../store/actions/vehicle_click';
import axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../Forms/Login/Login';
import Aux from '../../hoc/Auxilary';
import {DatePicker} from 'shineout';

class VehicleDetail extends Component {

    state = {
        vehicles: {},
        show: false,
        user: false,
        showDate: false,
        startdatetime: '',
        enddatetime: ''
    }


    buyVehicleHandler = () => {
        console.log(this.props.user_id);
        if(this.props.user_id === null){
            alert("Kindly Login")
            // this.setState({
            //     user: false,
            //     show: true    
            // })
        }
    }

    

    lendHandler = (e) => {
        this.setState(oldState => ({showDate: !oldState.showDate}));
    }
    
     componentDidMount () {
         console.log(this.props.vehicle_id);
        const {match: {params}} = this.props;
        console.log(params);
        console.log(params.vehicle_id);
        let a = params.vehicle_id;
        console.log(a.charAt(0));
        a = a.substring(1);
        console.log(a);

        
         axios.post(`http://localhost:3001/fetch-specific-vehicle/${a}`)
         .then(response => {
            console.log(response);
            this.setState({vehicles: response.data});
         });
     }

     cancel = () => {
        this.setState({show: false});
    }

    startDateHandler = (e) => {
        this.setState({startdatetime: e});
    }

    endDateHandler = e => {
        this.setState({enddatetime: e});
    }
 
    proceedHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/rent-now', {user_client_id: this.props.user_id, 
                        vehicle_id: this.state.vehicles.vehicle_id,
                        start_date: this.state.startdatetime,
                        end_date: this.state.enddatetime})
        .then(response => {
            console.log(response);
        })
    }
 
    render () {

        let log = null;
        log = <Login />
        

        let dc = <div className={classes.DateContainer}>
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
            
            <button onClick={this.proceedHandler} className="btn btn-danger">Proceed To Payment</button>
        </form>
            
        </div>

        
        let vehicleDetail = (
            <div className={classes.InnerContainer}>
                
                <h3>{this.state.vehicles.brand} {this.state.vehicles.model}</h3> 
                <h6>Price:{this.state.vehicles.price}</h6>
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
                <div className={classes.but}>
                <button onClick={this.buyVehicleHandler} className="btn btn-primary">Buy Vehicle</button>
                <div style={{width:'10px', height: 'auto', display: 'inline-block'}}></div>
                <button onClick={this.lendHandler} className="btn btn-success">Rent Vehicle</button>
                </div>

                {
                    this.state.showDate === true ? dc : null
                }

            </div>
        );



        return (
            <Aux>
                
            <div className={classes.Container}>
            <Modal show={this.state.show} modalClosed={this.cancel} >
                    {log}
                </Modal>
                   <h2>Vehicle Details</h2> 
                   {vehicleDetail}
            </div>
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        vehicle_id: state.vehicle.vehicle_id,
        vehicles: state.vehicle.vehicles,
        user_id: state.auth.userId
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchVehicleDetails: () => dispatch()
//     }
// }

export default connect(mapStateToProps, null)(VehicleDetail);