import React, {Component} from 'react';
import classes from './Signing.module.css';
import { NavLink} from 'react-router-dom';
import Login from '../../containers/Forms/Login/Login';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxilary';
import SignIn from '../../containers/Forms/SignIn/SignIn';

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

                    <div>
                        <button onClick={this.logHandler} className={classes.Log}>
                                Log In
                        </button>  
              <br/>
              <br />
                     <button className={classes.Sign}>
                         <NavLink to="/SignUp" exact>Sign Up</NavLink>
                     </button>
                </div>
        

            </div>
            </Aux>
        )
    }

}


export default Signing;