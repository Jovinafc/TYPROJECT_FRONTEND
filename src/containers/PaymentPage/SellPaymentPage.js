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

class SellPaymentPage extends Component {
    state = {
        vehicles: {},
        Invalid: false,
        number: '',
        name: '',
        cvc: '',
        expiry: '',
        focused: ''
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

    numberHandler = (e) => {
        this.setState({number: e.target.value})
    }

    nameHandler = (e) => {
        this.setState({name: e.target.value})
    }
    
    
    expiryHandler = (e) => {
        this.setState({expiry: e.target.value})
    }
    cvcHandler = (e) => {
        this.setState({cvc: e.target.value})
    }

    render () {

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


     const onSubmit = async values => {
        await sleep(300)
        window.alert(JSON.stringify(values, 0, 2))
      }



        return (
            <div className={classes.Container}>
                <h3> Payment Page </h3>
                <div>
                    Sell Page


                    {/* <Cards
                   number={this.state.number}
                   name={this.state.name}
                   expiry={this.state.expiry}
                   cvc={this.state.cvc}
                   focused={this.state.focused}
                     />
            
                    <form>
                        Number<input value={this.state.number} onChange={this.numberHandler} type="number" /> 
                        Name <input value={this.state.name} onChange={this.nameHandler} type="text" />
                        expiry <input value={this.state.expiry} onChange={this.expiryHandler} type="number" />
                        cvc <input value={this.state.cvc} onChange={this.cvcHandler} type="number" />


                    </form>
                     */}

(
  <Styles>
    <h1>🏁 React Final Form</h1>
    <h2>Credit Card Example</h2>
    <a href="https://github.com/erikras/react-final-form#-react-final-form">
      Read Docs
    </a>
    <p>
      This example demonstrates how to use the amazing{' '}
      <a
        href="https://github.com/amarofashion/react-credit-cards"
        target="_blank"
      >
        React Credit Cards
      </a>{' '}
      library with your form.
    </p>
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        reset,
        submitting,
        pristine,
        values,
        active
      }) => {
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
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <h2>Values</h2>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )
      }}
    />
  </Styles>
)
                </div>
            </div>
        );
    }
}

export default SellPaymentPage;