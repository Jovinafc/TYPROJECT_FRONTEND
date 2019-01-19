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
                <Modal show={this.state.show} modalClosed={this.cancel}>
                    {log}
                </Modal>

                    <div className={classes.container}>    
                        <button onClick={this.logHandler} className="btn btn-primary btn-xs">
                                Log In
                        </button>  
                        <div style={{width: "10px"}}></div>
                     <button className={classes.signup}>
                         <NavLink to="/SignUp" exact>Sign Up</NavLink>
                     </button>
                </div>
        

            </div>
            </Aux>
        )
    }

}


export default Signing;