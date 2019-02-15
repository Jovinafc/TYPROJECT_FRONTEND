import React,{Component} from 'react';
import classes from './Otp.module.css';
import axios from 'axios';
import { connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class Otp extends Component {

    state = {
        otp: '',
        success: false
    }

    otpcodeHandler = (e) => {
        this.setState({
            otp: e.target.value
        })
    }

    otpsender = (e) => {
        e.preventDefault();
  
        axios.post('/confirm-payment', {email: this.props.email, token: this.state.otp})
        .then(response => {
          console.log(response);
          alert("Success");
          if(this.props.payment_type === 'Sell'){

          }
          else if(this.props.payment_type === 'Rent'){
                axios.post('/rent-now', {
                    user_client_id: localStorage.getItem('userId'), 
                         vehicle_id: this.props.vehicle_id,
                         start_date: this.props.startdatetime,
                         end_date: this.props.enddatetime,
                         owner_bank_account: this.props.owner_bank_account,
                         client_bank_account: this.props.client_bank_account,
                         rent_amount: this.props.price
            })
          }
          
          this.setState({success: true})

        })
        .catch(err => {
          console.log(err);
        })
      }

      

    render () {

        let success = null;
        if(this.state.success){
        success = (
            <Redirect to="/Success" />
        )
        }

        return (
            <div className={classes.Container}>
                {success}
                <div className={classes.Box}>
                <form>

                            {/* <div className="form-group">
                    <label htmlFor="otp" className="col-sm-8 control-label">Enter OTP<p>(Sent on your registered Email)</p></label>
                    <div className="col-sm-4">
                    <input type="number" className="form-control" id="otp" onChange={this.otpcodeHandler} value={this.state.otp}/>        
                    </div>    
                            </div>
                             */}

                            <div className="form-group">
                            <label htmlFor="otp" className="col-sm-8 control-label">Enter OTP<p>(Sent on your registered Email)</p></label>
                             <div style={{textAlign: "center", paddingLeft: "15%"}}>   
                             <div className="col-sm-10" style={{textAlign: "center"}}>
                             <input type="number" id="otp" className="form-control" onChange={this.otpcodeHandler} value={this.state.otp}/>
                            </div>
                            </div>
                            </div>

                             <br />
                             <div className={classes.submit }>
                               <button onClick={this.otpsender} className="btn btn-success">Submit</button>       
                             </div>
                    </form>
    
                </div> 
                    
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
      email: state.auth.email,
      payment_type: state.vehicle.type_payment,
      startdatetime: state.vehicle.startDate,
      enddatetime: state.vehicle.endDate,
      owner_id: state.vehicle.vehicles.user_id,
      owner_bank_account: state.vehicle.owner_bank_account_no,
      client_bank_account: state.auth.bank_account_no,
      price: state.vehicle.vehicles[0].price,
      vehicle_id: state.vehicle.vehicle_id
    }
  }

export default connect(mapStateToProps, null)(Otp);