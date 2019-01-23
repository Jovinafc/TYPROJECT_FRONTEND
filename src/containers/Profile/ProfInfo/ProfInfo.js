import React, {Component} from 'react';
import classes from './ProfInfo.module.css';
import cx from 'classnames';
import globalStyles from '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { DatePicker} from 'shineout';
import axios from 'axios';
import { connect } from 'react-redux';

class ProfInfo extends Component {

    
    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        DOB: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
        user_id: this.props.user_id
    }

    componentDidMount() {
        axios.post('/fetch-user', {user_id: this.props.user_id})
        .then(res => {
            console.log(res.data);
            this.setState({
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                phone_number: res.data.phone_number,
                DOB:res.data.DOB,
                address:res.data.address,
                state: res.data.state,
                city: res.data.city,
                pincode: res.data.pincode
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

    dobHandler = (e) => {
        this.setState({DOB: e});
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
        this.setState({pincode : e.target.value});
    }

    submitHandler = (e) => {
        console.log('Initiated')
        e.preventDefault();
        axios.post('/update-user-profile', {users: this.state })
        .then( res => {
            console.log(res);
            console.log('Success');
        })
        console.log('Completed')
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
                    <label htmlFor="address" className="col-sm-2 control-label">Address</label>
                    <div className="col-sm-10">
                    <textarea className="form-control" type="text" rows="3" id="address" onChange={this.addressHandler} value={this.state.address || ''}/>    
                        </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="state" className="col-sm-2 control-label">State</label>
                    <div className="col-sm-10">
                    <select className="form-control" onChange={this.stateHandler} type="select" id="state" onChange={this.stateHandler} value={this.state.state} ></select>    
                        </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="city" className="col-sm-2 control-label">City</label>
                    <div className="col-sm-10">
                    <select className="form-control" onChange={this.cityHandler} type="select" id="city" onChange={this.cityHandler} value={this.state.city} ></select>    
                        </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="pincode" className="col-sm-2 control-label">Pin Code</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control" id="pincode" onChange={this.pincodeHandler} value={this.state.pincode || ''}/>        
                    </div>    
                        </div>

                        <div>
                    <label htmlFor="dob" className="col-sm-2 control-label">Date of Birth</label>
                    <div className="col-sm-10">
                    <DatePicker id="dob" onChange={this.dobHandler} value={this.state.DOB} />
                    </div>
                        </div>

                        <div style={{textAlign: 'center', marginTop: '15px'}}>
                        <button type="button" onClick={this.submitHandler} className="btn btn-success">Save</button>
                        </div>
                 </form>
                 </div>
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


export default connect(mapStateToProps,null)(ProfInfo);