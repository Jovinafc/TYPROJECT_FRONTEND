import React,{Component} from 'react';
import classes from './Delete.module.css';
import ProfNav from '../ProfNav/ProfNav';
import Modal from '../../../components/UI/Modal/Modal';
import Aux from '../../../hoc/Auxilary';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect} from 'react-redux';
import * as actions from '../../../store/actions/auth';
import {Redirect} from 'react-router-dom';

class Delete extends Component {

        state = {
            show: false,
            email: '',
            password: '',
            user_id: this.props.user_id,
            
        }  

    deletaHandler = (e) => {
        e.preventDefault();
        this.setState({show: true})

    }

    
    cancel = () => {
        this.setState({show: false})
    }

    emailHandler = (e) => {
        this.setState({email: e.target.value});
    }

    passwordHandler = (e) => {
        this.setState({password: e.target.value});
    }

    
    submitHandler = (e) => {
        e.preventDefault();
        axios.post('/delete-account', {email: this.state.email, password: this.state.password, user_id: this.state.user_id})
        .then(res =>{
            this.props.onLogout();
        })
        .catch(err => {
        });

        this.setState({
            email: '',
            password: '',
            show: false
        })
    }


    render () {
        let mod = null;
         mod = <div>
                    <form className={classes.form}>

            <div className="form-group">
            <h3 style={{textAlign: 'center'}}> Delete Account </h3>
            <br/><br/>
            <TextField label="Email" id="email" placeholder="Email" type="text" onChange={this.emailHandler}/>
            </div>
            <br />
            <div className="form-group">
            <TextField  label="Password" id="pass" placeholder="Password" type="password" onChange={this.passwordHandler}/>
            <br />
            </div>
            <button className="btn btn-primary" onClick={this.submitHandler}> Delete</button>
    </form>
                </div>

            let authRedirect = null;
            if(!this.props.isAuthenticated){
                authRedirect = <Redirect to={this.props.authRedirectPath}/>
            }


        return (
            <Aux>

            {authRedirect}

            <div className={classes.Container}>

            <Modal show={this.state.show} modalClosed={this.cancel}>
                {mod}
            </Modal>
           <div className={classes.Menu}>
                <ProfNav />
            </div>

            <div className={classes.Main}>
                <div>
                <h2 style={{textAlign: 'center'}}>Delete Your Account</h2>
                
                <p style={{marginTop: '30px'}}>Are You Sure you want to Delete your account?<b>All your data will be deleted permanently</b></p>

                  
                <div style={{textAlign: 'center'}}>
                <button className="btn btn-danger"  onClick={this.deletaHandler} >Delete</button>

                </div>
                </div>
            </div>

        </div>
            

        
        </Aux>    
            
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath

    };
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};





export default connect(mapStateToProps,mapDispatchToProps)(Delete);