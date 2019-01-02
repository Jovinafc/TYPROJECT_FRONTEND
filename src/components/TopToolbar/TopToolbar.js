import React, { Component } from 'react';
import classes from './TopToolbar.module.css'
import Signing from '../Signing/Signing';
import { connect } from 'react-redux';

class TopToolbar extends Component {

    render () {
        let sign = <Signing />
        if(this.props.isAuthenticated){
            sign = <div className={classes.afterlogin}>
            <h4 style={{textAlign: "center"}}>J</h4> 
            {/* <QuickAccess className={classes.dropdown-content} />     */}
            <div className={classes.dropdowncontent}>
                <a href="/Profile">My Profile</a>
                <a href="/myvehicles">My Vehicles</a>
                <a href="/history">Vehicle History</a>
                <a href="/help">Help</a>
                <a href="/logout">Logout</a>
            </div>
            </div>
        }


        return (
            <div className={classes.nav}>
            <div className={classes.Logo}>Logo</div>
            <div className={classes.Name}>
                <h4>Website Name</h4>
            </div>

            <div className={classes.sign}>
                {sign}
            </div>
        </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};


export default connect(mapStateToProps, null)(TopToolbar);