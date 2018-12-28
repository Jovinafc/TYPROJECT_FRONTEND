import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import { Route, Switch, withRouter } from 'react-router-dom';
import Cards from './containers/Cards/Cards';
import SignUpForm from './containers/Forms/SignUpForm/SignUpForm';
import SignIn from './containers/Forms/SignIn/SignIn'; 
import SellVehicle from './containers/SellVehicle/SellVehicle'; 
import Aux from './hoc/Auxilary';
import Logout from './containers/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';
import Homepage from './containers/HomePage/HomePage';
import Profile from './containers/Profile/Profile';

class App extends Component {
  
  componentDidMount = () => {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route  exact path="/signin" exact component={SignIn}/>
          <Route path="/display" exact component={Cards} />
          <Route path="/signUp" exact component={SignUpForm} />
          <Route path="/sell" exact component={SellVehicle} />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route exact path="/signin" exact component={SignIn}/>
            <Route path="/" exact component={Homepage} />
            <Route path="/display" exact component={Cards} />
            <Route path="/signUp" exact component={SignUpForm} />
            <Route path="/sell" exact component={SellVehicle} />
            <Route path="/logout" exact component={Logout}/>
            <Route path="/profile" exact component={Profile} />
        </Switch>
             
      )
    }

   
    return (
      <Aux>
      <div style={{backgroundColor: 'white'}}> 
        
       
        <Layout >
        {routes}

        </Layout>

        <div style={{textAlign: 'center', height: '200px', backgroundColor: 'grey'}}>
            <h2>Footer Section </h2>
        </div>


      </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
