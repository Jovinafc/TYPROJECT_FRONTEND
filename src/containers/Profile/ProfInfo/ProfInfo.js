import React, {Component} from 'react';
import classes from './ProfInfo.module.css';
import cx from 'classnames';
import globalStyles from '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
// import { DatePicker} from 'shineout';
import axios from 'axios';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from 'react-bootstrap/Alert'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'react-moment';
import ModernDatePicker from 'react-modern-datepicker'
import { throws } from 'assert';


class ProfInfo extends Component {

    notify = () => toast("Wow so easy !");

    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        DOB: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
        bank_no: '',
        user_id: this.props.user_id,
        show: false,
        pin_numberError: '',
        cityError: '',
        stateError: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        axios.post('/fetch-user', {user_id: this.props.user_id})
        .then(res => {
            console.log(res.data);
            this.setState({
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                phone_number: res.data.phone_number,
                DOB:res.data.DOB.slice(0,10),
                address:res.data.address,
                state: res.data.state,
                city: res.data.city,
                pincode: res.data.pincode,
                bank_no: res.data.bank_account_no
            });         
            
        })
    }



    fnameHandler = (e) => {
        this.setState({first_name: e.target.value});
    }

    lnameHandler = (e) => {
        // this.props.last_name= e.target.value
        this.setState({last_name: e.target.value});
    }

    phoneHandler = (e) => {
        // this.props.phone_number= e.target.value
        this.setState({phone_number: e.target.value});
    }

    addressHandler = (e) => {
        this.setState({address: e.target.value});
    }

    dobHandler = (date) => {
        
        console.log(date);
        this.setState({DOB: date})
        // this.setState({DOB: e.target.value});
    }

    stateHandler = (e) => {
        this.setState({state: e.target.value});
    }

    cityHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    pincodeHandler = (e) => {
        let v = false;
        this.setState({pincode : e.target.value});

        let pincodeRegex = /^\d{6}$/;
        if((e.target.value.match(pincodeRegex))){
            v = true;
        }

        if(v === false) {
            this.setState({
                pin_numberError: 'Please Enter 6 digits'
            })
        }
        
    }

    bankHandler = (e) => {
        this.setState({bank_no: e.target.value});
    }

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

        if(this.state.bank_no === '') {
            isError = true;
            this.setState({
                ...this.state,
                bank_noError: "Please Enter Bank Account Number"
            })
            errors.bank_noError = "Please Enter Bank Account Number"
        }

        let v = false;
        let phoneno = /^\d{10}$/;
        // if((this.state.phone_number.match(phoneno))){
        //     v = true;
        // }
        
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

        if(this.state.pincode === ''){
            isError = true;
            this.setState({
                ...this.state,
                pin_numberError: "Please Enter Pin Number"
            })
            errors.pin_numberError = "Please Enter Pin Number"
        }

        let pi = false;
        let pincodeRegex = /^\d{10}$/;
        if((this.state.pincode.match(pincodeRegex))){
            pi = true;
        }
        
        if(pi === false) {
            isError = true;
            this.setState({
                ...this.state,
                pin_numberError: 'Please Enter 6 digits'
            })
            errors.pin_numberError = 'Enter Valid Number'
        }

        let ci = false;
        let cityRegex = /^[A-Za-z\s]+$/;
        if((this.state.city.match(cityRegex))){
            ci = true;
        }

        if(ci === false) {
            isError = true;
            this.setState({
                ...this.state,
                cityError: 'Enter proper City'
            });
            errors.cityError = 'Enter Proper City'
        }

        
        let si = false;
        let stateRegex = /^[A-Za-z\s]+$/;
        if((this.state.state.match(stateRegex))){
            ci = true;
        }

        if(si === false) {
            isError = true;
            this.setState({
                ...this.state,
                stateError: 'Enter Proper State Name'
            });
            errors.stateError = 'Enter Proper State Name'
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
        if(error){
            e.preventDefault();
            const users = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone_number: this.state.phone_number,
                DOB: this.state.DOB,
                address: this.state.address,
                state: this.state.state,
                city: this.state.city,
                pincode: this.state.pincode,
                user_id: this.state.user_id,
                bank_account_no: this.state.bank_no
            }
        axios.post('/update-user-profile', {users: users })
        .then( res => {
            alert('Saved')
            this.props.fetchUser(this.state.user_id);
        })
        .catch(err => {
            console.log(err);
        })
        }
        else {
            console.log('Declined');
        }
        
              
    }

    alertHandler = () => {
        this.setState({
            show: true
        })
    }

    render () {
        return (
            <div>
                <h3 style={{textAlign: "center"}}>Basic Information</h3>
                <br />
                <div >
                <form  className="form-horizontal">
                 
                {/* className={cx(globalStyles.label, globalStyles['col-sm-2 control-label'], classes.Inp)} */}

                        <div className={cx(globalStyles.form, globalStyles['form-group'], classes.con) }>
                    <label htmlFor="fname"  className="col-sm-2 control-label">First Name</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="fname" onChange={this.fnameHandler} value={this.state.first_name}/>
                    </div>
                        </div>
                    

                        <div className="form-group">
                    <label htmlFor="lname" className="col-sm-2 control-label">Last Name</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="lname" onChange={this.lnameHandler} value={this.state.last_name}/>
                    </div>
                        </div>

                        <div className="form-group">
                    <label htmlFor="phone" className="col-sm-2 control-label">Phone Number</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control" id="phone" onChange={this.phoneHandler} value={this.state.phone_number}/>        
                    </div>    
                        </div>

                        
                        <div className="form-group">
                    <label htmlFor="bank_no" className="col-sm-2 control-label">Bank Account No</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control" id="bank_no" onChange={this.bankHandler} value={this.state.bank_no || ''}/>        
                    </div>    
                        </div>



                        <div className="form-group">
                    <label htmlFor="address" className="col-sm-2 control-label">Address</label>
                    <div className="col-sm-10">
                    <textarea className="form-control" type="text" rows="3" id="address" onChange={this.addressHandler} value={this.state.address || ''}/>    
                        </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="state" className="col-sm-2 control-label">State</label>
                    <div className="col-sm-10">
                    <input className="form-control" onChange={this.stateHandler} type="text" id="state" onChange={this.stateHandler} value={this.state.state || ''} />   
                    <span style={{color: 'red'}}>{this.state.stateError}</span>   

                        </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="city" className="col-sm-2 control-label">City</label>
                    <div className="col-sm-10">
                    <input className="form-control" onChange={this.cityHandler} type="text" id="city" onChange={this.cityHandler} value={this.state.city || ''} />    
                    <span style={{color: 'red'}}>{this.state.cityError}</span>   
    
                        </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="pincode" className="col-sm-2 control-label">Pin Code</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control" id="pincode" onChange={this.pincodeHandler} value={this.state.pincode || ''}/>        
                    <span style={{color: 'red'}}>{this.state.pin_numberError}</span>   

                    </div>    
                        </div>

                        
                        <div>
                    <label htmlFor="dob" className="col-sm-2 control-label">Date of Birth</label>
                    <div className="col-sm-10">
                    {/* <DatePicker id="dob" dateFormat="yyyy-MM-dd" onChange={this.dobHandler} value={this.state.DOB} /> */}
                    <ModernDatePicker 
                    id="dob"
                    format={'YYYY-MM-DD'} 
                    date = {this.state.DOB}
                    onChange={(date) => this.dobHandler(date)} 
                    showBorder
                    className="form-control"
                    />
                    </div>
                        </div>

                       

                        <div style={{textAlign: 'center', marginTop: '80px'}}>
                        <button type="button" onClick={this.submitHandler} className="btn btn-success">Save</button>
                        <br/>
                        <br />
                        {/* <button onSubmit={this.alertHandler} >Notify!</button> */}
                        
                        </div>
                 </form>
                 </div>
                 <Alert show={this.state.show} key="idx" variant="dark">
                            This is a dark alert
                </Alert>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        first_name: state.auth.first_name,
        last_name: state.auth.last_name,
        phone_number: state.auth.phone_number,
        dob: state.auth.dob,
        user_id: state.auth.userId
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (user_id) => dispatch(actions.userData(user_id)) 

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ProfInfo);