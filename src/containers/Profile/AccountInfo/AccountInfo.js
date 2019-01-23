import React, {Component} from 'react';
import classes from './AccountInfo.module.css';
import ProfNav from '../ProfNav/ProfNav';
import cx from 'classnames';
import globalStyles from '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import axios from 'axios';

class AccountInfo extends Component {

    state = {
        email: '',
        old_password: '',
        new_password: '',
        confirm_password: ''

    }

    componentDidMount = () => {
        axios.post('/fetch-user', {user_id: this.props.user_id})
        .then(res => {
            console.log(res.data);
            this.setState({
                email: res.data.email
                // old_password: res.data.password
            });         
            
        })
    }


    emailHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    } 

    oldPasswordHandler = (e) => {
        this.setState({
            old_password: e.target.value
        })
    }

    newPasswordHandler = (e) => {
        this.setState({
            new_password: e.target.value
        })
    }

    confirmPassword = (e) => {
        this.setState({
            confirm_password: e.target.value
        })
    }

    submitAccountHandler = (e) => {
        e.preventDefault();
        console.log('In Submit Method')
        if(this.state.new_password === this.state.confirm_password){
            axios.post('/update-password', {email: this.state.email, old_password: this.state.old_password, password: this.state.confirm_password})
            .then( response => {
                console.log(response);    
            })
        }
    }
 

    render () {
        return (
            <div className={classes.Container}>

                <div className={classes.Menu}>
                    <ProfNav />
                </div>

                <div className={classes.Main}>
                    <h3>Account Info</h3>
                    <div>
                    <form  className="form-horizontal">
                 
                 {/* className={cx(globalStyles.label, globalStyles['col-sm-2 control-label'], classes.Inp)} */}
 
                         <div className={cx(globalStyles.form, globalStyles['form-group'], classes.con) }>
                     <label htmlFor="fname"  className="col-sm-2 control-label">Email</label>
                     <div className="col-sm-10">
                     <input type="text" className="form-control" id="fname" onChange={this.emailHandler} disabled value={this.state.email}/>
                     </div>
                         </div>
                     
                     <br />
 
                         <div className="form-group">
                     <label htmlFor="old_password" className="col-sm-4 control-label">Current Password</label>
                     <div className="col-sm-10">
                     <input type="password" className="form-control" id="old_password" onChange={this.oldPasswordHandler} value={this.state.old_password}/>
                     </div>
                         </div>
 
                         <div className="form-group">
                     <label htmlFor="new_password" className="col-sm-4 control-label">New Password</label>
                     <div className="col-sm-10">
                     <input type="text" className="form-control" id="new_password" value={this.state.new_password} onChange={this.newPasswordHandler}/>
                     </div>
                         </div>

                         <div className="form-group">
                     <label htmlFor="confirm_pass" className="col-sm-4 control-label">Re-Enter New Password</label>
                     <div className="col-sm-10">
                     <input type="text" className="form-control" id="confirm_pass"  onChange={this.confirmPassword} value={this.state.confirm_password}/>
                     </div>
                         </div>

                            <div style={{textAlign: 'center', marginTop: '15px'}}>
                        <button type="button" className="btn btn-success" onClick={this.submitAccountHandler}>Save</button>
                            </div>
 
   
                    </form>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        user_id: state.auth.userId
    }
}


export default connect(mapStateToProps,null)(AccountInfo);