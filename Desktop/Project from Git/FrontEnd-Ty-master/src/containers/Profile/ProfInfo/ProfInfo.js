import React, {Component} from 'react';
import classes from './ProfInfo.module.css';
import cx from 'classnames';
import globalStyles from '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { DatePicker} from 'shineout';


class ProfInfo extends Component {
    render () {
        return (
            <div>
                <h3 style={{textAlign: "center"}}>Basic Information</h3>
                <br />
                <div >
                <form  className="form-horizontal">
                 
                {/* className={cx(globalStyles.label, globalStyles['col-sm-2 control-label'], classes.Inp)} */}

                        <div className={cx(globalStyles.form, globalStyles['form-group'], classes.con) }>
                    <label htmlFor="fname"  className="col-sm-2 control-label">First Name</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="fname"/>
                    </div>
                        </div>
                    

                        <div className="form-group">
                    <label htmlFor="lname" className="col-sm-2 control-label">Last Name</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="lname"/>
                    </div>
                        </div>

                        <div className="form-group">
                    <label htmlFor="phone" className="col-sm-2 control-label">Phone Number</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control" id="phone" />        
                    </div>    
                        </div>

                        <div className="form-group">
                    <label htmlFor="address" className="col-sm-2 control-label">Address</label>
                    <div className="col-sm-10">
                    <textarea className="form-control" type="text" rows="3" id="address" />    
                        </div>    
                        </div>

                        <div>
                    <label htmlFor="dob" className="col-sm-2 control-label">Date of Birth</label>
                    <div className="col-sm-10">
                    <DatePicker id="dob" />
                    </div>
                        </div>

                        <div style={{textAlign: 'center', marginTop: '15px'}}>
                        <button type="button" className="btn btn-success">Save</button>
                        </div>
                 </form>
                 </div>
            </div>
        );
    }
}


export default ProfInfo;