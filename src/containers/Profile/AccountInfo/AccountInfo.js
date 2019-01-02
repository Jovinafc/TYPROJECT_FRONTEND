import React, {Component} from 'react';
import classes from './AccountInfo.module.css';
import ProfNav from '../ProfNav/ProfNav';


class AccountInfo extends Component {
    render () {
        return (
            <div className={classes.Container}>

                <div className={classes.Menu}>
                    <ProfNav />
                </div>

                <div className={classes.Main}>
                    <h3>Account Info</h3>

                </div>

            </div>
        );
    }
}


export default AccountInfo;