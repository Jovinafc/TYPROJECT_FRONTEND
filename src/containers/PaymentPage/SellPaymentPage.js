import React, { Component } from 'react';
import classes from './SellPaymentPage.module.css';
import axios from 'axios';
import Card from './Card';
import * as actions from '../../store/actions/vehicle_click';
import { Form, Field } from 'react-final-form'
import Styles from './Styles';
import { Redirect } from 'react-router-dom';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtils'
import { connect} from 'react-redux';
// import Spinner from '../../components/UI/Spinner/Spinner';
import { css } from '@emotion/core';
import {ClipLoader} from 'react-spinners';
// import moment, * as moments from 'moment';
import Alert from 'react-s-alert';


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
        loading: '',
        days: ''
    }
    componentDidMount() {
        window.scrollTo(0,0);


        const {match: {params}} = this.props
        let a = params.vehicle_id;
        a = a.substring(1);
        console.log(a);

        axios.post(`/fetch-specific-vehicle`, {user_id: localStorage.getItem('userId'), vehicle_id: a})
        .then(response => {
           console.log(response);
          if(response===null)
          {
              
          }
          else
          {
           this.setState({vehicles: response.data[0]});
           console.log(response.data)
           if(response.data[0].price === null){
                this.props.type_payment('Rent');
           }
           else{  
                this.props.type_payment('Sell');
           }
          }
        })
        .catch(err => {
            console.log(err);
            this.setState({Invalid: true})
        });   

        // console.log(this.props.start);
        // console.log(this.props.end);

        // let startDate = moment(this.props.start);
        // let endDate = moment(this.props.end);
        // // let days = moment().diff(startDate,endDate);
        // // console.log(days);

        // let duration = moment.duration(endDate.diff(startDate));
        // console.log(duration);
        // let days = duration.asDays();
        // console.log(days);
        // this.setState({
        //   days: days
        // })
        let sd = this.props.start;
        let ed = this.props.end;
        
        let s = sd.substring(8,10);
        console.log(s)
        let e = ed.substring(8,10);
        console.log(e);
        console.log(e-s);
        if(e-s === 0){
            this.setState({
                days: 1
            })
            this.props.price_on_days(1);
        }
        else {
        this.setState({
            days: e - s
        })
        this.props.price_on_days(e-s);

     }       


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

    // const onCardFormat = async value => {
    //   var v = ''
    //   var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    //   var matches = v.match(/\d{4,16}/g);
    //   var match = matches && matches[0] || ''
    //   var parts = []
    //   let len;
      
    //   for (let i=0, len=match.length; i<len; i+=4) {
    //     parts.push(match.substring(i, i+4))
    //   }
    //   if (parts.length) {
    //     return parts.join(' ')
    //   } else {
    //   return value
    // }
    //   }


     const onSubmit = async values => {

       this.setState({loading: true})
       console.log(values);
        await sleep(300)

        let expiry = values.expiry;
        if(expiry.length > 5){
          expiry = expiry.substring(0,5);
          console.log(expiry);
        }

        let cardNum = values.number;
        if(cardNum.length > 19){
          cardNum = cardNum.substring(0,19);
        }
        else{
          console.log('Enter a value')
        }
        console.log(expiry);
        

        console.log(cardNum);

        
        const cardDetails = {
          name: values.name,
          card_no: cardNum,
          cvv: values.cvc,
          expiry_date: expiry,
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
          else{
            Alert.warning('Invalid Card Details', {
              position: 'top',
              effect: 'bouncyflip',
              timeout: 3000,
              html: false
          });
         
          }

        })
        .catch(err => {
          console.log(err.response.data);
          Alert.warning('Invalid Card Details', {
            position: 'top',
            effect: 'bouncyflip',
            timeout: 3000,
            html: false
        });
          this.setState({loading: false})
        })
        
      }

      
      let otp = null 
      if(this.state.otpdisplay){
        otp = <Redirect to="/otp" />
      }

        return (
            <div className={classes.Container}>
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
                : this.state.vehicles.price_per_day*this.state.days + 5000}
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
    email: state.auth.email,
    start: state.vehicle.startDate,
    end: state.vehicle.endDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    type_payment: (payment_type) => dispatch(actions.type_of_payment(payment_type)),
    price_on_days: (days) => dispatch(actions.price_on_days(days))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellPaymentPage);