import React, { Component} from 'react';
import Input from '../../../components/UI/Input/Input'
import classes from './SignIn.module.css';
import {updateObject, checkValidity} from '../../../../src/shared/utility';
import axios from 'axios';
import Button from '../../../components/UI/FormComponents/Button';
import { NavLink } from 'react-router-dom';

class SignIn extends Component {
    state = {
        signInForm: {
            email: {
                elementType: 'input',
                label: 'Email*',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                label: 'Password*',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false

    }

    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.signInForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.signInForm[inputIdentifier].validation),
            touched: true
        });

        const updatedUserForm = updateObject(this.state.signInForm, {
            [inputIdentifier]: updatedFormElement
        });

        updatedUserForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedUserForm){
            formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({signInForm: updatedUserForm, formIsValid: formIsValid});
     }

   handleFormSubmit = (event) => {
    event.preventDefault();
   const user = {};

for(let formElementIdentifier in this.state.signInForm){
    user[formElementIdentifier] = this.state.signInForm[formElementIdentifier].value
    
}
console.log(user);

axios.post('https://jsonplaceholder.typicode.com/users', user)
.then((post)=>{
    alert('Data Sent');
    console.log('Res',post);
}).catch(e => {
    console.log(e);
    alert('Some Error...');
})
}




    render() {
        const formElementsArray = [];
        for(let key in this.state.signInForm){
            formElementsArray.push({
                id: key,
                config: this.state.signInForm[key]
            });
        }
        let form = (
            <form  >
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType= {formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid= {!formElement.config.valid}
                    valueType = {formElement.id}
                    shouldValidate={formElement.config.validation}
                    touched = {formElement.config.touched}
                    label={formElement.config.label}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button
                        disabled={!this.state.formIsValid}
                        action={this.handleFormSubmit}
                        type={"btn btn-primary"}
                        title={"Sign In"}
                        style={buttonStyle}
                        />
                <NavLink to="/SignUp">    
                    <Button
                        action={this.handleToSignUp}
                        type={"btn btn-info"}
                        title={"Create a New Account"}
                        style={buttonStyle}
                        />
                    </NavLink>
            </form>
        );
    
        return (
            <div className={classes.SignIn}> 
                <h2 style={{padding:'10px', textAlign:'center'}}>Sign In</h2>    
                {form}
                
            </div>
        );
    }

}


const buttonStyle = {
    margin: "10px 10px 10px 10px",

}

export default SignIn;