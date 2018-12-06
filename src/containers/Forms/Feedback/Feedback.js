import React, { Component} from 'react';
import Input from '../../../components/UI/Input/Input';
import axios from 'axios';
import { updateObject } from '../../../shared/utility';
import classes from './Feedback.module.css';

class Feedback extends Component {
    state = {
        userTest: {
            user_id: {
                elementType: 'input',
                label: 'ID',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ID'
                },
                value: ''
            },
            user_name: {
                elementType: 'input',
                label: 'Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: ''
            },
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.userTest[inputIdentifier], {
            value: event.target.value
        });

        const updatedUserForm = updateObject(this.state.userTest, {
            [inputIdentifier]: updatedFormElement
        });

        updatedUserForm[inputIdentifier] = updatedFormElement;

        this.setState({userTest: updatedUserForm});
   }

   submitTestHandler = (event) => {
    event.preventDefault();
 //   let a = this.state.userTest.user_id.value;
   // let b = this.state.userTest.user_name.value;

    var body = {
        
        id : this.state.userTest.user_id.value,
        userEmail : this.state.userTest.user_name.value

    }

 //  const user = {};

//for(let formElementIdentifier in this.state.userTest){
//    user[formElementIdentifier] = this.state.userTest[formElementIdentifier].value
//}
//
axios.post('localhost:4000/insert-table-values', {body} 
                                                            
                                                            )
.then(res => {
    console.log(res);
    console.log(res.data);

})
}

    render () {
        const formElementsArray = [];
        for(let key in this.state.userTest){
            formElementsArray.push({
                id: key,
                config: this.state.userTest[key]
            });
        }
        let form = (
            <form onSubmit={this.submitTestHandler}>
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
                <button type="submit">Submit</button>
            </form>
        );
    
    
        return (
            <div className={classes.Feedback}>
                <h4>Enter Feedback Data </h4>
                {form}
            </div>
        );

    };
    
}
    
export default Feedback;