import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import LayoutTwo from './containers/Layout/LayoutTwo';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
// import Cards from './containers/Cards/Cards';
import SignUpForm from './containers/Forms/SignUpForm/SignUpForm';
import SignIn from './containers/Forms/SignIn/SignIn';
import Login from './containers/Forms/Login/Login'; 
import SellVehicle from './containers/SellVehicle/SellVehicle'; 
import Aux from './hoc/Auxilary';
import Logout from './containers/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';
import * as actionss from './store/actions/cart';
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
import { setTimeout } from 'timers';
import Accessories from './containers/Accessories/Accessories';
import Cart from './containers/Cart/Cart';
import Otp from './containers/Otp/Otp';
import Success from './containers/Success/Success';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import ProductPayment from './containers/PaymentPage/ProductPayment';
import { ToastContainer} from 'react-toastify';
import asyncComponent from './hoc/asyncComponent/asynComponent';
import Loader from 'react-loader-spinner';

const asyncCards = asyncComponent(() => {
  return import('./containers/Cards/Cards');
});

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

    if(this.props.isAuthenticated){
        console.log('Item Number Counter')
        this.props.cartItems(localStorage.getItem('userId'));  
    }
    
  }

  render() {
    console.log(this.props.location.pathname);


    // let routes = (
    //   <Switch>
    //       <Route path="/" exact component={Homepage} />
    //       <Route path="/Signup" exact component={SignUp}/>
    //       <Route path="/display" exact component={Cards} />
    //       <Route path="/login" exact component={Login} />
    //       {/* <Route path="/signUp" exact component={SignUpForm} /> */}
    //       <Route path="/sell/sell" exact component={SellVehicle} />
    //       <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
    //       <Route path="/accessories" component={Accessories} />
    //   </Switch>
    // );

    // if(this.props.isAuthenticated){
    //   routes = (
    //     <Switch>
    //         <Route path="/" exact component={Homepage} />
    //         <Route path="/display" exact component={Cards} />
    //         <Route path="/login" exact component={Login} />
    //         <Route path="/sell/sell" exact component={SellVehicle} />
    //         <Route path="/logout" exact component={Logout}/>
    //         <Route path="/profile" exact component={Profile} />
    //         <Route path="/myvehicles" exact component={MyVehicle} />
    //         <Route path="/account" exact component={AccountInfo} />
    //         <Route path="/sellpayment/:vehicle_id" exact component={SellPaymentPage} />
    //         <Route path="/rentpayment/:vehicle_id" exact component={RentPaymentPage} />
    //         <Route path="/photo" exact component={Photo} />
    //         <Route path="/delete" exact component={Delete} />
    //         <Route path="/history" exact component={VehicleHistory} />
    //         <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
    //         <Route path="/accessories" component={Accessories} />
    //         <Route path="/sell/lend" component={Lend} />
    //         <Route path="/otp" component={Otp} />
    //      </Switch>
             
    //   )
    // }


    let layout1 = (
        <Switch >
            <Layout>
                <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/Signup" exact component={SignUp}/>
                <Route path="/display" exact component={asyncCards} />
                <Route path="/login" exact component={Login} />
                {/* <Route path="/signUp" exact component={SignUpForm} /> */}
                <Route path="/sell/sell" exact component={SellVehicle} />
                <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
                <Route path="/accessories" component={Accessories} />
                </Switch>
            </Layout>
        </Switch>
    )

    
    if(this.props.isAuthenticated) {
      // if(this.props.location.pathname === '/otp'){
      //   layout1 = (
      //       <Switch>
      //           <LayoutTwo>
      //               <Switch>
      //                   <Route path="/otp" exact component={Otp}/>
      //               </Switch>
      //           </LayoutTwo>
      //       </Switch>
      //   )
      // }
      
      layout1 = (
          <Switch>
              <Layout>
              <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/display" exact component={asyncCards} />
            <Route path="/login" exact component={Login} />
            <Route path="/sell/sell" exact component={SellVehicle} />
            <Route path="/logout" exact component={Logout}/>
            <Route path="/profile" exact component={Profile} />
            <Route path="/myvehicles" exact component={MyVehicle} />
            <Route path="/account" exact component={AccountInfo} />
            <Route path="/payment/:vehicle_id" exact component={SellPaymentPage} />
            {/* <Route path="/rentpayment/:vehicle_id" exact component={RentPaymentPage} /> */}
            <Route path="/photo" exact component={Photo} />
            <Route path="/delete" exact component={Delete} />
            <Route path="/history" exact component={VehicleHistory} />
            <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
            <Route path="/productdetail/:product_id" component={ProductDetail} />
            <Route path="/accessories" component={Accessories} />
            <Route path="/sell/lend" component={Lend} />
            <Route path="/otp" exact component={Otp}/>
            <Route path="/cart" exact component={Cart} />
            <Route path="/productpayment/:product_id" exact component={ProductPayment} />
            <Route path="/success" exact component={Success} />
             </Switch> 
              </Layout> 
          </Switch>  
      )
    }

    // let routes2 = (
    //       <Switch>
    //            <Route path="/otp" component={Otp} />
    //       </Switch>
    // );

    // const app = <div style={{backgroundColor: 'white'}}> 
    // <Layout> {routes} </Layout>
    //   </div>

    
    // if(<Route path="/otp" component={Otp} /> ){
    //    app = <div> {routes2} </div>
    // }
    
    return (
      <Aux>
             
      {layout1}    
      
      {/* <Spinner name="mySpinner">
                    <div style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      backgroundColor: 'wheat',
                      opacity: '0.2',
                      top: 0,
                      left: 0,
                      zIndex: '20'  
                    }}>
                      Loading...
                    </div>
               </Spinner>   */}
              
      <ToastContainer />
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
    getTokens: (email,user_id) => dispatch(actions.authRefresh(email,user_id)),
    cartItems: (user_id) => dispatch(actionss.cartItems(user_id))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
