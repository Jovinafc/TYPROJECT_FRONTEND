import React,{Component} from 'react';
import classes from './Delete.module.css';
import ProfNav from '../ProfNav/ProfNav';

class Delete extends Component {
    render () {
        return (
            <div className={classes.Container}>

            <div className={classes.Menu}>
                <ProfNav />
            </div>

            <div className={classes.Main}>
                <div>
                <h2 style={{textAlign: 'center'}}>Delete Your Account</h2>
                
                <p style={{marginTop: '30px'}}>Are You Sure you want to Delete your account?<b>All your data will be deleted permanently</b></p>
                <button className="btn btn-danger">Delete</button>
                </div>
            </div>

        </div>
            


            
        );
    }
}


export default Delete