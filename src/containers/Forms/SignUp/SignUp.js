import React,{ Component} from 'react';
import classes from './SignUp.module.css';
import {DatePicker} from 'shineout';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import axios from '../../../axios';
// import DatePicker from 'react-date-picker';
import {DateInput} from '@opuscapita/react-dates';
// import DatePicker from "react-bootstrap-date-picker";


class SignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        DOB: '',
        email: '',
        old_password: '',
        firstNameError: '',
        lastNameError: '',
        phone_numberError: '',
        DOBError: '',
        emailError:'',
        old_passwordError: '' 

    }

    componentDidMount= () => {
        window.scrollTo(0, 0)

    }

    fnameHandler = (e) => {
        let touched = null;
        touched = true;
        this.setState({first_name: e.target.value});
        // if(e.target.value.length <= 5){
        //     this.setState({
        //         firstNameError: 'Quite SHort'
        //     })
        // }
        // if(e.target.value.length > 5){
        //     this.setState({
        //         firstNameError: ''
        //     })
        // }

        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    firstNameError: 'Please Enter Name'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    firstNameError: ''
                })
            }
        }
        
    }

    lnameHandler = (e) => {
        let touched = null;
        touched = true;
        // this.props.last_name= e.target.value
        this.setState({last_name: e.target.value});
        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    lastNameError: 'Please Enter Last Name'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    lastNameError: ''
                })
            }
        }

    }

    phoneHandler = (e) => {
        let touched = null;
        let v = false;
        touched = true;
        // this.props.phone_number= e.target.value
        this.setState({phone_number: e.target.value});

        let phoneno = /^\d{10}$/;
        if((e.target.value.match(phoneno))){
            v = true;
        }
        
        if(v === false) {
            this.setState({
                phone_numberError: 'Please Enter Valid Number(10 digits)'
            })
        }
        // if(e.target.value === 9) {
        //     this.setState({
        //         phone_numberError: 'Enter Correct Number'
        //     })
        // }
        if(touched === true){
            if(e.target.value.length === '') {
                this.setState({
                    phone_numberError: 'Please Enter Phone Number'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    phone_numberError: ''
                })
            }
        }

    }
    
    dobHandler = (e) => {
        let touched = null;
        touched = true;
        this.setState({DOB: e})

        if(touched === true){
            if(e === 0) {
                this.setState({
                    DOBError: 'Please Enter DOB'
                })
            }

            if(e !== ''){
                this.setState({
                    DOBError: ''
                })
            }
        }
    }

    emailHandler = (e) => {
        let touched = null;
        touched = true;
        this.setState({
            email: e.target.value
        })

        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    emailError: 'Please Enter Email ID'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    emailError: ''
                })
            }
        }
    }

    oldPasswordHandler = (e) => {
        let touched = null;
        touched = true;
        this.setState({
            old_password: e.target.value
        })

        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    old_passwordError: 'Please Enter Password'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    old_passwordError: ''
                })
            }
        }
    }

    // helper = (element, errorname, errorMessage) => {
    //     if(element === ''){
    //     isError = true;

    //     this.setState({
    //         ...this.state,
    //         errorname: errorMessage
    //     })
    //     }
    // }

    validate = () =>  {
        let isError = false;
        let errors = {};

//First Name
        if(this.state.first_name === '') {
            isError = true;
            this.setState({
                ...this.state,
                firstNameError: "Please Enter Name"
            })
            errors.firstNameError = "Please Enter First Name"
        }


// Last Name   
        if(this.state.last_name === '') {
            isError = true;
            this.setState({
                ...this.state,
                lastNameError: "Please Enter Last Name"
            })
            errors.lastNameError = "Please Enter Last Name"

        }

//Phone Number
        if(this.state.phone_number === '') {
            isError = true;
            this.setState({
                ...this.state,
                phone_numberError: "Please Enter Phone Number"
            })
            errors.phone_numberError = "Please Enter Phone Number"

        }

        let v = false;
        let phoneno = /^\d{10}$/;
        if((this.state.phone_number.match(phoneno))){
            v = true;
        }
        
        if(v === false) {
            isError = true;
            this.setState({
                ...this.state,
                phone_numberError: 'Please Enter Valid Number(10 digits)'
            })
            errors.phone_numberError = 'Enter Valid Number'
        }

//DOB

        if(this.state.DOB === '') {
            isError = true;
            this.setState({
                ...this.state,
                DOBError: "Please Enter Correct DOB"
            })
            errors.DOBError = "Please Enter Correct DOB"
        }

//Email Validation

        if(this.state.email === '') {
            isError = true;
            this.setState({
                ...this.state,
                emailError: "Please Enter Email ID"
            })
            errors.emailError = "Please Enter Email ID"
        }

        let e = false;
        let pattern = /\S+@\S+\.\S+/;
        // let pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"; 
        if(this.state.email.match(pattern)){
            e = true;
            this.setState({
                ...this.state,
                emailError: ''
            })
            errors.emailError = ""
       }

        if(e === false) {
            isError = true;
            this.setState({
             ...this.state,
            emailError: 'Please Enter Correct ID'

            })
            errors.emailError = "Enter Valid Email Address"
        }

// Password Validation        

        if(this.state.old_password === '') {
            isError = true;
            this.setState({
                ...this.state,
                old_passwordError: "Please Enter Password"
            })
            errors.old_passwordError = "Please Enter Password"
        }

        let p = false;
        // let pattern1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let pattern1 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(this.state.old_password.match(pattern1)){
            p = true;
            this.setState({
                ...this.state,
                old_passwordError: ''
            })
            errors.old_passwordError = ""
       }

        if(p === false) {
            isError = true;
            this.setState({
             ...this.state,
            old_passwordError: 'Please Enter Correct ID'

            })
            errors.old_passwordError = "Enter Valid Password"
        }



        if(isError){
            
        this.setState({
            ...this.state,
            ...errors
        })  
        }

        return isError;
    }

    submitHandler = (e) => {

      const error = this.validate();
      if(!error){
      e.preventDefault();
      const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_number: this.state.phone_number,
        DOB: this.state.DOB,
        email: this.state.email,
        password: this.state.old_password
      }
      axios.post('/sign-up', {users: user})
      .then(res => {
          console.log(res);
          alert('Data Sent');
          this.setState({
              first_name: '',
              last_name: '',
              phone_number: '',
              DOB: '',
              email: '',
              old_password: ''
          })
      });

    }
    else {
        console.log("data not sufficient")
    }

}


    render () {
        let disable = true;
        if(this.state.first_name !== '' && 
            this.state.last_name !== '' &&
            this.state.phone_number !== '' &&
            this.state.DOB !== '' &&
            this.state.email !== '' &&
            this.state.old_password !== ''){
                disable = false;
            }

        console.log(this.state);
        return (
            <div className={classes.Container}>
                <h4> Sign Up </h4>
            <div className={classes.formCont}>
                <Form  className="form-horizontal">
                 
                 {/* className={cx(globalStyles.label, globalStyles['col-sm-2 control-label'], classes.Inp)} */}
 
                         <div className="form-group">
                     <label htmlFor="fname"  className="col-sm-2 control-label">First Name<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-10">
                     <input type="text" className="form-control" id="fname" onChange={this.fnameHandler} value={this.state.first_name}/>
                     <span style={{color: 'red'}}>{this.state.firstNameError}</span>   
                     </div>
                         </div>
                     
 
                         <div className="form-group">
                     <label htmlFor="lname" className="col-sm-2 control-label">Last Name<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-10">
                     <input type="text" className="form-control" id="lname" onChange={this.lnameHandler} value={this.state.last_name}/>
                     <span style={{color: 'red'}}>{this.state.lastNameError}</span>   

                     </div>
                         </div>
 
                         <div className="form-group">
                     <label htmlFor="phone" className="col-sm-2 control-label">Phone Number<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-10">
                     <input type="number" className="form-control" id="phone" onChange={this.phoneHandler} value={this.state.phone_number}/>        
                     <span style={{color: 'red'}}>{this.state.phone_numberError}</span>   

                     </div>    
                         </div>
 
     
                         <div>
                     <label htmlFor="dob" className="col-sm-2 control-label">Date of Birth<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-4">
                     {/* <DatePicker id="dob" onChange={this.dobHandler} value={this.state.DOB} /> */}
                     {/* <DatePicker onChange={this.dobHandler} value={this.state.DOB} /> */}
                     {/* <DateInput  value={this.state.DOB} onChange={this.dobHandler} dateFormat="dd-MM-yyyy"
  disabled={false}
  locale="en" />   */}
                    <DatePicker  value={this.state.DOB} onChange={this.dobHandler} />
   

                     <span style={{color: 'red'}}>{this.state.DOBError}</span>   

                    

                     </div>
                         </div>

                         <div className='form-group'>
                     <label htmlFor="emails"  className="col-sm-2 control-label">Email<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-10">
                     <Input type="text" className="form-control" id="emails" onChange={this.emailHandler} value={this.state.email}/>
                     <span style={{color: 'red'}}>{this.state.emailError}</span>   

                     </div>
                         </div>
                     
                
 
                         <div className="form-group">
                     <label htmlFor="old_password" className="col-sm-4 control-label">Current Password<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-10">
                     <input type="password" className="form-control" id="old_password" onChange={this.oldPasswordHandler} value={this.state.old_password}/>
                     <span style={{color: 'red'}}>{this.state.old_passwordError}</span>   

                     </div>

                         </div>
 


 
                         <div style={{textAlign: 'center', marginTop: '15px'}}>
                         <button disabled={disable} type="button" onClick={this.submitHandler} className="btn btn-success">Save</button>
                         </div>

                         
                  </Form>

                


            </div>

            
            <br />
            </div>
        )
    }
}

export default SignUp;



