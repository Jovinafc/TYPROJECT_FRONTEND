import React, { Component } from 'react';
import classes from './SellPaymentPage.module.css';
import axios from 'axios';
import {DatePicker} from 'shineout';
import Card from './Card';
import * as actions from '../../store/actions/vehicle_click';
import { Form, Field } from 'react-final-form'
import Styles from './Styles';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Auxilary'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtils'
import { connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { css } from '@emotion/core';
import {ClipLoader} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: yellow;
`;

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
        otpdisplay: false,
        spin: false,
        loading:false
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
           this.setState({vehicles: response.data[0]});
           console.log(response.data)
           if(response.data.price !== null){
                this.props.type_payment('Sell');
           }
           else{
                this.props.type_payment('Rent');
           }
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

       this.setState({loading: true})
       console.log(values);
        await sleep(300)
        const cardDetails = {
          name: values.name,
          card_no: values.number,
          cvv: values.cvc,
          expiry_date: values.expiry,
          amount: this.state.vehicles.price || this.state.vehicles.price_per_day
        }
        axios.post('/pay-now', {card_details: cardDetails})
        .then(response => {
          console.log(response.data);
          if(response.data === 'VALID'){
            console.log(this.props.email);
            axios.post('/request-otp', {email: this.props.email})
            .then(res=> {
                console.log(res);
                this.setState({
                  loading: false,
                  otpdisplay: true
                })
            })
          }

        })
        .catch(err => {
          console.log(err.response.data);
          this.setState({loading: false})
        })
        
        // window.alert(JSON.stringify(values, 0, 2))
      }

      // let otp = null
      // if(this.state.otpdisplay){
      //   otp = <div>
      //           OTP <input onChange={this.setOtp} value={this.state.otp} type="number" />
      //           <br />
      //           <button onClick={this.otpsender}>Confirm</button>
      //       </div>

      // }
      let otp = null 
      if(this.state.otpdisplay){
        otp = <Redirect to="/otp" />
      }

      let spin = null
      if(this.state.spin) {
        spin = <Spinner />
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
                Pay &#x20B9; {this.state.vehicles.price !== null
                ? this.state.vehicles.price
                : this.state.vehicles.price_per_day}
              </button>
              <div>
              <ClipLoader
                  css={override}
                  sizeUnit={"px"}
                  size={20}
                  color={'#123abc'}
                  loading={this.state.loading}
               />
              </div>
              
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

const mapDispatchToProps = dispatch => {
  return {
    type_payment: (payment_type) => dispatch(actions.type_of_payment(payment_type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellPaymentPage);