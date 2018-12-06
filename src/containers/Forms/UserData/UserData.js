import React, { Component} from 'react';
import Input from '../../../components/UI/Input/Input'
import classes from './UserData.module.css';
import {updateObject} from '../../../../src/shared/utility';
import axios from 'axios';
import Button from '../../../components/UI/FormComponents/Button';
import Aux from '../../../hoc/Auxilary';
import Modal from '../../../components/UI/Modal/Modal';
import Login from '../../Forms/Login/Login';

class UserData extends Component {
    state = {
        userForm: {
            ID: {
                elementType: 'input',
                label: 'ID',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ID'
                },
                value: ''
            },
            name: {
                elementType: 'input',
                label: 'Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            address: {
                elementType: 'textarea',
                label: 'Address',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                label:'City',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: ''
            },
            pinCode: {
                elementType: 'input',
                label: 'PinCode',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pincode'
                },
                value: '',
                validation: {
                    minLength: 6,
                    maxLength: 6
                },
            },
            mobileNo: {
                elementType: 'input',
                label: 'Mobile No',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Number'
                },
                value: ''
            },
            Email: {
                elementType: 'input',
                label: 'Email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            DOB: {
                elementType: 'input',
                label: 'Date of Birth',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your DOB'
                },
                value: ''
            },
        },
        displayData: [],
        show: false,
        close: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.userForm[inputIdentifier], {
            value: event.target.value
        });

        const updatedUserForm = updateObject(this.state.userForm, {
            [inputIdentifier]: updatedFormElement
        });

        updatedUserForm[inputIdentifier] = updatedFormElement;

        this.setState({userForm: updatedUserForm});
   }
//
//    submitHandler = event => {
//        event.preventDefault();
//
//        const user = {
//            name: this.state.userForm.name.value,
//            address: this.state.userForm.address.value,
//            city: this.state.userForm.city.value,
//            pincode:this.state.userForm.pinCode.value,
//            mobileNo: this.state.userForm.mobileNo.value,
//            Email: this.state.userForm.Email.value,
//            DOB: this.state.userForm.DOB.value
//        };
//
//        axios.post('https://jsonplaceholder.typicode.com/users', {user})
//        .then(res => {
//            console.log(res);
//            console.log(res.data);
//
//        })
//        
//    }
//

            loginHandler = (e) => {
                this.setState({
                    show: true
                })
            }

            cancelHandler = () => {
                this.setState({
                    show: false
                })
            }

            submitHandler = (event) => {
            event.preventDefault();
           const user = {};

        for(let formElementIdentifier in this.state.userForm){
            user[formElementIdentifier] = this.state.userForm[formElementIdentifier].value
            
        }
        console.log(user);

        axios.post('http://localhost:3001/insert-table-values', {tableName:'User', values: user })
        .then((post)=>{
            alert('Data Sent');
            console.log('Res',post);
        }).catch(e => {
            console.log(e);
            alert('Some Error...');
        })
    }

    render () {
       const formElementsArray = [];
        for(let key in this.state.userForm){
            formElementsArray.push({
                id: key,
                config: this.state.userForm[key]
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
                    valueType = {formElement.id}
                    label={formElement.config.label}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button
                        action={this.submitHandler}
                        type={"btn btn-primary"}
                        title={"Sign In"}
                        style={buttonStyle}
                        />
            </form>
        );

        let login = null;
        
        login = <Login />
    
        return (
            <Aux>

            <Modal show={this.state.show} modalClosed={this.cancelHandler}>
                {login}
            </Modal>
        
            
            <div className={classes.UserData}>
            <button onClick={this.loginHandler}>Login</button>
            <h2 style={{padding:'10px', textAlign:'center'}}>Sign In</h2>    
            {form}
                
            </div>
            </Aux>
        );

    };
    
}
const buttonStyle = {
    margin: "10px 10px 10px 10px",

}


export default UserData;