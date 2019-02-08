import React, { Component } from 'react';
import classes from './RentPaymentPage.module.css';
import axios from '../../axios';
import {DatePicker} from 'shineout';
import {MomentInput} from 'react-moment-input';
import { object } from 'prop-types';
import moment from 'moment';
import visa from '../../Images/visa.png';
import mastercard from '../../Images/mastercard.jpg'
import Card from './Card';
import { connect} from 'react-redux';
import { Form, Field } from 'react-final-form'
import Styles from './Styles';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtils'


class RentPaymentPage extends Component {
    state = {
        vehicles: {},
        Invalid: false,
        startdatetime: '',
        enddatetime: '',
        newdate: '',
        cardNumber: '',
        cardName: '',
        cvc: '',
        expiry: '',
        otp: '',
        otpdisplay: false

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

    
    newDateHandler = (e) => {
        this.setState({newdate: object})
    }

    cardnumHandler = (e) => {
        this.setState({cardNumber: e.target.value});
        console.log(e.target.value);

    }

    setOtp = (e) => {
        e.preventDefault();
        this.setState({
            otp: e.target.value
        })
      }
  
      otpsender = (e) => {
        e.preventDefault();
  
        axios.post('/confirm-payment', {email: this.props.email, token: this.state.otp})
        .then(response => {
          console.log(response);
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
          alert("Success");
        })
        .catch(err => {
          console.log(err);
        })
      }
  

    render () {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


     const onSubmit = async values => {
       console.log(values);
        await sleep(300)
       
        const cardDetails = {
            name: values.name,
            card_no: values.number,
            cvv: values.cvc,
            expiry_date: values.expiry,
            amount: this.state.vehicles.price
          }
          axios.post('/pay-now', {card_details: cardDetails})
          .then(response => {
            console.log(response.data);
            if(response.data === 'VALID'){
              console.log(this.props.email);
              axios.post('/request-otp', {email: this.props.email})
              this.setState({
                otpdisplay: true
              })
            }
  
          })
          .catch(err => {
            console.log(err.response.data);
          })
          
        
      }

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
{/* 
            <MomentInput
              max={moment().add(5,'days')}
              min={moment()}  
              format="YYYY-MM-DD HH:mm"
              options={true}
              className="col-sm-4"
              readOnly={false}
              icon={false}
              defaultValue={this.state.newdate}
              onSave={(newdate) => {this.setState({newdate})}}
               /> */}

            <button onClick={this.proceedHandler} className="btn btn-danger">Proceed To Payment</button>
        </form>
            
        </div>

    let otp = null
    if(this.state.otpdisplay){
      otp = <div>
              OTP <input onChange={this.setOtp} value={this.state.otp} type="number" />
              <br />
              <button onClick={this.otpsender}>Confirm</button>
          </div>

    }


        return (
            <div className={classes.Container}>
                <h3> Payment Page </h3>
                <div>
                    {this.state.Invalid === true
                    ? <h4> Error 404 </h4>
                    : 
                    // <div>   
                    //     {this.state.vehicles.price
                    //     ? <h4>Buy 
                    //         <p>{this.state.vehicles.brand}</p>    
                    //       </h4>
                    //     : <h4>Rent</h4>}

                    //      {this.state.vehicles.price
                    //      ? <h4>Buy </h4>
                    //      : <div> {dc} </div>
                    //      }    
                    // </div>
                    <div>
                        {dc}

                        

  <Styles>
    <Form
      onSubmit={onSubmit}
      render={
        ({
        handleSubmit,
        reset,
        submitting,
        pristine,
        values,
        active,
        disable = true
      }) => {
        console.log(values);
         disable = values.number > 0 && values.name > 0 && values.expiry > 0 && values.cvc > 0;
         console.log(disable);
        return (
          <form onSubmit={handleSubmit}>
             <Card
               number={values.number || ''}
               name={values.name || ''}
               expiry={values.expiry || ''}
               cvc={values.cvc || ''}
               focused={active}
            />
            <div>
              <Field
                name="number"
                component="input"
                type="text"
                value={this.state.number}
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={disable}>
                Rent {this.state.vehicles.price_per_day}
              </button>
            </div>
            </form>
        )
      }}
    />
  </Styles>



                       {/* <div className={classes.formContainer}> 
                        <form  className="form-horizontal">
                 
                         <div className="form-group">
                     <label htmlFor="cardnumber"  className="col-sm-4 control-label">Card Number<span style={{color: 'red'}}>*</span> 
                     &nbsp;&nbsp;&nbsp;
                     <span>Visa</span></label>
                     <div className="col-sm-8">
                     <input type="number" className="form-control" id="cardnumber" onChange={this.cardnumHandler} value={this.state.cardNumber}/>
                     <span style={{color: 'red'}}>{this.state.cardNumError}</span>   
                     </div>
                         </div>

                         <div className="form-group">
                     <label htmlFor="cardname"  className="col-sm-4 control-label">Name on Card<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-4">
                     <input type="text" className="form-control" id="cardname" onChange={this.cardnameHandler} value={this.state.cardName}/>
                     <span style={{color: 'red'}}>{this.state.cardNameError}</span>   
                     </div>
                         </div>

                         <div className="form-group">
                     <label htmlFor="expiry"  className="col-sm-4 control-label">Expiry<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-4">
                     <input type="date"  className="form-control" id="expiry" onChange={this.expiryHandler} value={this.state.expiry}/>
                     <span style={{color: 'red'}}>{this.state.expiryError}</span>   
                     </div>
                         </div>

                         <div className="form-group">
                     <label htmlFor="cvc"  className="col-sm-4 control-label">CVC<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-4">
                     <input type="number"  className="form-control" id="cvc" onChange={this.cvcHandler} value={this.state.cvc}/>
                     <span style={{color: 'red'}}>{this.state.cvcError}</span>   
                     </div>
                         </div>

 
                        </form>

                        </div> */}
                    </div>
                    
                    }
                    
                        
                </div>
                    {otp}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      email: state.auth.email,
      user_id: state.auth.user_id
    }
  }
  

export default connect(mapStateToProps, null)(RentPaymentPage);