import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Cards from './containers/Cards/Cards';
import SignUpForm from './containers/Forms/SignUpForm/SignUpForm';
import SignIn from './containers/Forms/SignIn/SignIn';
import Login from './containers/Forms/Login/Login'; 
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
import VehicleDetail from './containers/VehicleDetail/VehicleDetail';
import Lend from './containers/SellVehicle/Lend/Lend';
import SignUp from './containers/Forms/SignUp/SignUp';
import SellPaymentPage from './containers/PaymentPage/SellPaymentPage';
import RentPaymentPage from './containers/PaymentPage/RentPaymentPage';
import { setTimeout } from 'timers';
import Accessories from './containers/Accessories/Accessories';


class App extends Component {
  
  componentDidMount = () => {

    
    this.props.onTryAutoSignUp();

    if(localStorage.getItem('token')){
      const expiry = localStorage.getItem('expirationDate');
    let d1 = new Date(expiry);
    let d2 = new Date();
    
    
    let d3 = d1.getTime();
    let d4 = d2.getTime();
    let d5 = d3-d4;
    //305000
    if(d5<3405000)
    {
        console.log("LogOut")
        console.log(localStorage.getItem('userId'));
        this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('userId'))
        // setTimeout(this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('token')), 0)
        // this.props.getTokens(this.props.email, this.props.user_id);
    }

    console.log(d3);
    console.log(d4);
    console.log(d5);    
  console.log(d2.getHours());



    }
    
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/Signup" exact component={SignUp}/>
          <Route path="/display" exact component={Cards} />
          <Route path="/login" exact component={Login} />
          {/* <Route path="/signUp" exact component={SignUpForm} /> */}
          <Route path="/sell/sell" exact component={SellVehicle} />
          <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
          <Route path="/accessories" component={Accessories} />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/display" exact component={Cards} />
            <Route path="/login" exact component={Login} />
            <Route path="/sell/sell" exact component={SellVehicle} />
            <Route path="/logout" exact component={Logout}/>
            <Route path="/profile" exact component={Profile} />
            <Route path="/myvehicles" exact component={MyVehicle} />
            <Route path="/account" exact component={AccountInfo} />
            <Route path="/sellpayment/:vehicle_id" exact component={SellPaymentPage} />
            <Route path="/rentpayment/:vehicle_id" exact component={RentPaymentPage} />
            <Route path="/photo" exact component={Photo} />
            <Route path="/delete" exact component={Delete} />
            <Route path="/history" exact component={VehicleHistory} />
            <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
            <Route path="/accessories" component={Accessories} />
            <Route path="/sell/lend" component={Lend} />
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
    isAuthenticated: state.auth.token !== null,
    user_id: state.auth.userId,
    upload: state.auth.photoadd,
    email: state.auth.email
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    getUserData: (user_id) => dispatch(actions.userData(user_id)),
    getTokens: (email,user_id) => dispatch(actions.authRefresh(email,user_id))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
