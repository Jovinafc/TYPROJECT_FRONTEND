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
        password: '',
        errorM: '',
        valid: true,
        emailError:false,
        passwordError: false,
        emailErrors : this.props.error === "User Does Not Exist",
        passwordErrors : this.props.error === "Invalid Password"
    }

    componentDidMount() {
        if(this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }

    }

    // componentWillMount() {
    //     if(this.props.error === 'User Does Not Exist'){
    //         this.setState({emailError: 'User Does Not Exist'})
    //     }

    //     if(this.props.error === 'Invalid Password'){
            
    //         this.setState({passwordError: 'Invalid Password'})
    //     }
       
    // }

    emailHandler = (e) => {
        
        this.setState({
            email: e.target.value,
            
        })
    }

    passwordHandler = (e) => {
        
        this.setState({
            password: e.target.value,
            valid: false
        })
    }

    validate = () => {
        let isError = false;

        if(this.state.email === '') {
            isError = true;
            
        }

        if(this.state.password === ''){
            isError = true;
        }

        return isError;
    }

    submitHandler = (event) => {

        const error = this.validate();
        if(!error){
            event.preventDefault();
            this.props.onAuth(this.state.email, this.state.password);  
        }
        else {

        }
    }

    render () {

       

        let form = (
            <div>
            <div className="form-group">
            <br/><br/>
            <TextField 
            placeholder="Email" 
            type="text" 
            value={this.state.email}
            error= {this.props.error === "User Does Not Exist"}
            helperText={this.props.error === "User Does Not Exist" ? 'Email Id does not exist' : ' '}
            onChange={this.emailHandler}/>
            </div>
            <br />
            <div className="form-group">
            <TextField  
            value={this.state.password}
            placeholder="Password" 
            type="password"
            error = {this.props.error === "Invalid Password"}
            helperText={this.props.error === "Invalid Password" ? 'Invalid Password' : ''} 
            onChange={this.passwordHandler}/>
            <br />
            </div>
            <button disabled={this.state.valid} className="btn btn-primary" > Login</button>
            <p>Not Registered?<NavLink to="/SignUp">Sign Up Here</NavLink></p>
            </div>
    );

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = <p></p>;

        if(this.props.error) {
            errorMessage = (
                <p style={{color: 'red'}}>{this.props.error}</p>
            )
        }

        console.log(this.state);
        return (
            <Aux>
                <div>
                <h3 style={{textAlign: 'center'}}> Login </h3>
                {errorMessage}
                <form className={classes.form} onSubmit={this.submitHandler} >
                    {form}
                

                </form>
                
                    
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        authRedirectPath: state.auth.authRedirectPath

    };
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Login);