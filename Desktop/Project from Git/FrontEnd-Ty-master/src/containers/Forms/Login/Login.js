import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilary';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import classes from './Login.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    emailHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    }

    render () {

        let form = (<form className={classes.form}>

            <div className="form-group">
            <h3 style={{textAlign: 'center'}}> Login </h3>
            <br/><br/>
            <TextField label="Email" id="email" placeholder="Email" type="text" onChange={this.emailHandler}/>
            </div>
            <br />
            <div className="form-group">
            <TextField  label="Password" id="pass" placeholder="Password" type="password" onChange={this.passwordHandler}/>
            <br />
            </div>
            <button className="btn btn-primary" onClick={this.submitHandler}> Login</button>
            <p>Not Registered?<NavLink to="/SignUp">Sign Up Here</NavLink></p>
    </form>);

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        return (
            <Aux>
                <div>
                {errorMessage}
                {form}
                    
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Login);