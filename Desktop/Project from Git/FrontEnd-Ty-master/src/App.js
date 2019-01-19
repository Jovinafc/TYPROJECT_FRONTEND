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
import MyVehicle from './containers/MyVehicle/MyVehicle';
import AccountInfo from './containers/Profile/AccountInfo/AccountInfo';
import Photo from './containers/Profile/Photo/Photo';
import Delete from './containers/Profile/Delete/Delete';
import VehicleHistory from './containers/VehicleHistory/VehicleHistory';


class App extends Component {
  
  componentDidMount = () => {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/display" exact component={Cards} />
          <Route path="/signUp" exact component={SignUpForm} />
          <Route path="/sell" exact component={SellVehicle} />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/display" exact component={Cards} />
            <Route path="/sell" exact component={SellVehicle} />
            <Route path="/logout" exact component={Logout}/>
            <Route path="/profile" exact component={Profile} />
            <Route path="/myvehicles" exact component={MyVehicle} />
            <Route path="/account" exact component={AccountInfo} />
            <Route path="/photo" exact component={Photo} />
            <Route path="/delete" exact component={Delete} />
            <Route path="/history" exact component={VehicleHistory} />

         </Switch>
             
      )
    }

   
    return (
      <Aux>
      <div style={{backgroundColor: 'white'}}> 
        
       
        <Layout >
        {routes}

        </Layout>

        

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
