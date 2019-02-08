import React, { Component } from 'react';
import classes from './SellPaymentPage.module.css';
import axios from 'axios';
import {DatePicker} from 'shineout';
import Card from './Card';
import { Form, Field } from 'react-final-form'
import Styles from './Styles';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtils'
import { connect} from 'react-redux';


class SellPaymentPage extends Component {
    state = {
        vehicles: {},
        Invalid: true,
        number: '',
        name: '',
        cvc: '',
        expiry: '',
        focused: '',
        otp: '',
        otpdisplay: false
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
        alert("Success");
      })
      .catch(err => {
        console.log(err);
      })
    }

    render () {
        console.log(this.state)
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
        
        // window.alert(JSON.stringify(values, 0, 2))
      }

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
                Pay {this.state.vehicles.price}
              </button>
            </div>
            </form>
        )
      }}
    />
  </Styles>

                </div>
                {otp}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email
  }
}

export default connect(mapStateToProps, null)(SellPaymentPage);