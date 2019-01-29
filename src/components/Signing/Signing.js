import React, {Component} from 'react';
import classes from './Signing.module.css';
import { NavLink} from 'react-router-dom';
import Login from '../../containers/Forms/Login/Login';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxilary';

class Signing extends Component {

    state = {
        show: false
    }

    logHandler = () => {
        this.setState({show: true});
    }

    cancel = () => {
        this.setState({show: false});
    }
    render () {

        let log = null;
        log = <Login />
        return (
            <Aux>
               <div> 
                {/* <Modal show={this.state.show} modalClosed={this.cancel}>
                    {log}
                </Modal> */}

                    <div className={classes.container}>    
                        {/* <button onClick={this.logHandler} className="btn btn-primary btn-xs">
                                Log In
                        </button>   */}
                        <NavLink to="/login"><button className="btn btn-primary btn-xs" >Login</button></NavLink>
                        <div style={{width: "10px"}}></div>
                        <NavLink to="/Signup" exact> <button className="btn btn-success btn-xs">Sign Up</button></NavLink>
                </div>
        

            </div>
            </Aux>
        )
    }

}


export default Signing;