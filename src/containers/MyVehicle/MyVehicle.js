import React, { Component} from 'react';
import classes from './MyVehicle.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import MyVehicleCard from '../../components/UI/MyVehicleCard/MyVehicleCard';

class MyVehicle extends Component {
 
    state = {
        myvehicle: []
    }

    componentDidMount = () => {
        axios.post('http://localhost:3001/fetch-specific-user-vehicles', {user_id: this.props.user_id})
        .then(res => {
            console.log(res.data);
            const vehicles = [];
            for(let key in res.data){
              vehicles.push({
                  ...res.data[key],
                  id: key
              });  
            }
            this.setState({myvehicle: vehicles})
        });
    }

    render () {
        console.log(this.state.myvehicle);

        let display; 
        if(this.state.myvehicle === null) {
            display =  <h4>Nothing to Show </h4>
        }
       
         display = this.state.myvehicle.map(dis => (
            <MyVehicleCard key={dis.id} details={dis}/>
        ));

        

        return (
            <div className={classes.Container}>
               <h2 style={{textAlign: 'center', marginBottom: "4%"}}>My Vehicle Details</h2>                 
               {display}                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(MyVehicle);