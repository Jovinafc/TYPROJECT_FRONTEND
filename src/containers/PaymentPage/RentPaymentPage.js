import React, { Component } from 'react';
import classes from './RentPaymentPage.module.css';
import axios from 'axios';
import {DatePicker} from 'shineout';


class RentPaymentPage extends Component {
    state = {
        vehicles: {},
        Invalid: false,
        startdatetime: '',
        enddatetime: ''
    }

    startDateHandler = (e) => {
        this.setState({startdatetime: e});
        console.log(e);
    
    }

    endDateHandler = e => {
        this.setState({enddatetime: e});
        console.log(e);
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
    componentDidMount() {
        window.scrollTo(0,0);
        const {match: {params}} = this.props
        let a = params.vehicle_id;
        a = a.substring(1);
        console.log(a);

        axios.post(`/fetch-specific-vehicle/${a}`, {user_id: localStorage.getItem('userId')})
        .then(response => {
           console.log(response);
          if(response===null)
          {

          }
          else
          {
           this.setState({vehicles: response.data});
           console.log(this.state.vehicles)
          }
        })
        .catch(err => {
            console.log(err);
            this.setState({Invalid: true})
        });   
    }

    

    render () {

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

        return (
            <div className={classes.Container}>
                <h3> Payment Page </h3>
                <div>
                    {this.state.Invalid === true
                    ? <h4> Error 404 </h4>
                    : 
                    <div>   
                        {this.state.vehicles.price
                        ? <h4>Buy 
                            <p>{this.state.vehicles.brand}</p>    
                          </h4>
                        : <h4>Rent</h4>}

                         {this.state.vehicles.price
                         ? <h4>Buy </h4>
                         : <div> {dc} </div>
                         }    
                    </div>
                    }    
                </div>
            </div>
        );
    }
}

export default RentPaymentPage;