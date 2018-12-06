import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserData from './containers/Forms/UserData/UserData';
import Cards from './containers/Cards/Cards';
import SignUpForm from './containers/Forms/SignUpForm/SignUpForm';
import SignIn from './containers/Forms/SignIn/SignIn'; 
import SignInForm from './containers/SignInForm/SignInForm';
import SellVehicle from './containers/SellVehicle/SellVehicle'; 
import Aux from './hoc/Auxilary';
import Modal from './components/UI/Modal/Modal';


class App extends Component {
  state = {
    show: false
  }

  loginHandler = () => {
    this.setState({show: true});
  }


  cancel = () => {
    this.setState({show: false});
  }
  render() {
    let routes = (
      <Switch>
          <Route path="/" exact component={UserData} />
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/display" exact component={Cards} />
          <Route path="/signUp" exact component={SignUpForm} />
          <Route path="/signInForm" exact component={SignInForm} />
          <Route path="/sell" exact component={SellVehicle} />
      </Switch>
    );

    let log = null;

    log = <SignIn />

    return (
      <Aux>
      <div style={{backgroundColor: 'white'}}> 
        
        <Modal show={this.state.show} modalClosed={this.cancel}>
          {log}
        </Modal>

        <Layout />
        
        {routes}

        <div style={{textAlign: 'center', height: '200px', backgroundColor: 'grey'}}>
            <h2>Footer Section 
              <button onClick={this.loginHandler}>
                Login
              </button>
            </h2>
        </div>


      </div>
      </Aux>
    );
  }
}

export default withRouter(App);
