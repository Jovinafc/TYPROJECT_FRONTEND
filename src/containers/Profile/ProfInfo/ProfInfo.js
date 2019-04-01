import React, {Component} from 'react';
import classes from './ProfInfo.module.css';
import cx from 'classnames';
import globalStyles from '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import Alert from 'react-s-alert';
import Datetime from 'react-datetime';
import {ClipLoader} from 'react-spinners';
import { css } from '@emotion/core';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: yellow;
`;



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
        documents: '',
        documentPrev: '',
        user_id: this.props.user_id,
        show: false,
        pin_numberError: '',
        cityError: '',
        stateError: '',
        bank_noError: '',
        uploadspin: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        axios.post('/fetch-user', {user_id: this.props.user_id})
        .then(res => {
            this.setState({
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                phone_number: res.data.phone_number,
                DOB:res.data.DOB.slice(0,10),
                address:res.data.address,
                state: res.data.state,
                city: res.data.city,
                pincode: res.data.pincode,
                bank_no: res.data.bank_account_no,
                documentPrev: res.data.documents
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
        else {
            this.setState({
                pin_numberError: ''
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

        let pn = false;

        if(this.state.phone_number !== null || ''){
            let phoneRegex = /^\d{10}$/;
            if(this.state.pincode.match(phoneRegex)){
            pn = true;
        }
        
        }    
        if(pn === false) {
            isError = true;
            this.setState({
                ...this.state,
                pin_numberError: 'Please Enter 10 digits'
            })
            errors.pin_numberError = 'Enter Valid Number'
        }


//Bank Account        
        if(this.state.bank_no === '') {
            isError = true;
            this.setState({
                ...this.state,
                bank_noError: "Please Enter Bank Account Number"
            })
            errors.bank_noError = "Please Enter Bank Account Number"
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

//PinCode

        if(this.state.pincode === null || ''){
            isError = true;
            this.setState({
                ...this.state,
                pin_numberError: "Please Enter Pin Number"
            })
            errors.pin_numberError = "Please Enter Pin Number"
        }

        let pi = false;

        if(this.state.pincode !== null || ''){
            let pincodeRegex = /^\d{6}$/;
            if(this.state.pincode.match(pincodeRegex)){
            pi = true;
        }
        
        }    
        if(pi === false) {
            isError = true;
            this.setState({
                ...this.state,
                pin_numberError: 'Please Enter 6 digits'
            })
            errors.pin_numberError = 'Enter Valid Number'
        }

//City        
        if(this.state.city === null || ''){

        }

        if(this.state.city !== null || ''){

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
        else {
            isError = false;
            
            this.setState({
                ...this.state,
                cityError: ''
            });
            errors.cityError = ''
        }

        
        let si = false;
        let stateRegex = /^[A-Za-z\s]+$/;
        if((this.state.state.match(stateRegex))){
            si = true;
        }

        if(si === false) {
            isError = true;
            this.setState({
                ...this.state,
                stateError: 'Enter Proper State Name'
            });
            errors.stateError = 'Enter Proper State Name'
        }
        else{
            isError = false;
            this.setState({
                ...this.state,
                stateError: ''
            });
            errors.stateError = ''
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
            this.setState({
                uploadspin: true
            })
            const users = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone_number: this.state.phone_number,
                DOB: this.state.DOB,
                address: this.state.address,
                state: this.state.state,
                city: this.state.city,
                pincode: this.state.pincode,
                user_id: localStorage.getItem('userId'),
                bank_account_no: this.state.bank_no
            }

        const fd = new FormData(); 
        fd.append('documentImage', this.state.documents);   
        axios.post('/documentImage', fd).then(res => {

            axios.post('/update-user-profile', {users: users })
            .then( res => {
                this.setState({
                    uploadspin: false
                })
                Alert.success('Profile Updated', {
                    position: 'top',
                    effect: 'bouncyflip',
                    timeout: 3000,
                    html: false
                });
                this.props.fetchUser(this.state.user_id);
            })
            .catch(err => {
                this.setState({
                    uploadspin: false
                })
            })

            
        })

        }
        
              
    }

    alertHandler = () => {
        this.setState({
            show: true
        })
    }


    handleDocumentChange = (e) => {
        e.preventDefault();
       
       let reader = new FileReader();
       let file = e.target.files[0];
       if(file === undefined) {
           this.setState({ documentPrev: null})
       }
       reader.onload = (e) => {
           this.setState({
               documents: file,
               documentPrev: reader.result,
           });
       }
       if(e.target.files[0]){
           reader.readAsDataURL(e.target.files[0]);
           this.setState({
               documentPrev: ''
           })
       }
    }
   
    
    render () {
        
        let {documentPrev} = this.state;
        let documentPreview = null;
        if(documentPrev) {
            documentPreview = (<img alt="document" className={classes.Image} src={documentPrev} />);
        }

        let dis = false;

        if(this.state.first_name === '' || this.state.last_name === '' || this.state.phone_number === '' ||
           this.state.bank_no === '' || this.state.address === '' || this.state.state === '' || this.state.city === ''
           || this.state.pincode === '' || this.state.documents === ''){
               dis = true
           }

        return (

            <div className={classes.Cont}>
                <h3 style={{textAlign: "center"}}>Basic Information</h3>
                <br />
                <div className={classes.formCont}>
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
                    <label htmlFor="bank_no" className="col-sm-4 control-label">Bank Account No</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control" id="bank_no" onChange={this.bankHandler} value={this.state.bank_no || ''}/>        
                    <span style={{color: 'red'}}>{this.state.bank_noError}</span>   

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
                    <input className="form-control" onChange={this.stateHandler} type="text" id="state" value={this.state.state || ''} />   
                    <span style={{color: 'red'}}>{this.state.stateError}</span>   

                        </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="city" className="col-sm-2 control-label">City</label>
                    <div className="col-sm-10">
                    <input className="form-control" onChange={this.cityHandler} type="text" id="city" value={this.state.city || ''} />    
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

                        
                        <div className="form-group"> 
                    <label htmlFor="dob" className="col-sm-2 control-label">Date of Birth</label>
                    <div className="col-sm-10">
                    {/* <DatePicker id="dob" dateFormat="yyyy-MM-dd" onChange={this.dobHandler} value={this.state.DOB} /> */}
                    {/* <ModernDatePicker 
                    id="dob"
                    format={'YYYY-MM-DD'} 
                    date = {this.state.DOB}
                    onChange={(date) => this.dobHandler(date)} 
                    showBorder
                    className="form-control"
                    /> */}
                    <Datetime value={this.state.DOB} style={{width: '60%'}} onChange={this.starth}/>  
                                
                    </div>
                        </div>


                        <div className="form-group">
                            <label htmlFor="documents" className="col-sm-4 control-label">Document</label>
                            <div className="col-sm-10">
                    <input accept="image/*" type="file" className="form-control" id="documents" onChange={this.handleDocumentChange} />        
                    <span style={{color: 'red'}}>{this.state.documentError}</span>   

                    </div>    
                    {documentPreview}
                   
                        </div>

                       

                        <div style={{textAlign: 'center', marginTop: '10px', marginBottom: '20%'}}>
                        <button type="button" disabled={dis} onClick={this.submitHandler} className="btn btn-success">Save</button>
                        &nbsp;&nbsp;&nbsp;
                        <ClipLoader
                        style={override}
                //   css={override}
                  sizeUnit={"px"}
                  size={25}
                  color={'#123abc'}
                  loading={this.state.uploadspin}
               />
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