import React, { Component}  from 'react';
//import NavigationItems from '../../components/NavigationItems/NavigationItems';
//import UserData from '../Forms/UserData/UserData';
//import Feedback from '../Forms/Feedback/Feedback';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import { connect } from 'react-redux';  
import TopToolbar from '../../components/TopToolbar/TopToolbar';
import Headroom from 'react-headroom';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
            
         } );
    }


    render () {
        return (
            <Aux>
                <TopToolbar 
                 isAuth = {this.props.isAuthenticated}
                 />
                <Toolbar 
                isAuth = {this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer 
                isAuth = {this.props.isAuthenticated}
                open={this.state.showSideDrawer } 
                closed={this.sideDrawerClosedHandler} />

                <main   className={classes.Content}>
                        {this.props.children}
                </main>

                <div style={{textAlign: 'center', height: '200px', backgroundColor: 'grey'}}>
                    <h2>Footer Section </h2>
                </div>




            </Aux>
    );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);

