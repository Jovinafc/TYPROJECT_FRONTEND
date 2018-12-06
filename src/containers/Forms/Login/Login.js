import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilary';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import classes from './Login.module.css';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    emailHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitHandler = () => {
        
    }

    render () {
        return (
            <Aux>
                <div>
                    <form className={classes.form}>
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
                            <button className="btn btn-primary">Login</button>
                            <p>Not Registered?<NavLink to="/SignUp">Sign Up Here</NavLink></p>
                    </form>
                </div>
            </Aux>
        )
    }
}

export default Login;