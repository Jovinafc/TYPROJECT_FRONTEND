import React, {Component} from 'react';
import classes from './VehicleHistory.module.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import axios from 'axios';
import VehicleHistoryCard from '../../components/UI/VehicleHistory/VehicleHistoryCard'; 


class VehicleHistory extends Component {

    state = {
        vehicles : [],
        vehicleComment: [],
        vehicleRate: []
    }

    componentDidMount = () => {
        console.log("Inside Vehicle History");
        axios.post('/vehicle-history', {user_id: localStorage.getItem('userId')})
        .then(response => {
            console.log(response.data.details);
            console.log(response.data);
            // this.setState({
            //     vehicles: response.data
            // })
            const vehiclesHist = [];
            for(let key in response.data.details){
                vehiclesHist.push({
                    ...response.data.details[key],
                    id: key
                });
            }
            this.setState({
                vehicles: vehiclesHist
            })
            let vehicleRate = [];
            for(let key in response.data.ratingDetails){
                vehicleRate.push({
                    ...response.data.ratingDetails[key],
                    id: key
                });
            }
            this.setState({
                vehicleRate: vehicleRate
            })
    
            let vehicleCom = [];
            for(let key in response.data.commentDetails){
                vehicleCom.push({
                    ...response.data.commentDetails[key],
                    id: key
                });
            }
            this.setState({
                vehicleComment: vehicleCom
            })
           
        })
        .catch(err => {
            console.log(err);
        })
    }

    render () {

        let display ;

        console.log(this.state.vehicles.length);
        if(this.state.vehicles.length === 0){
            display = <h4>Nothing to Show</h4>
        }
        display = this.state.vehicles.map(dis => (
            <VehicleHistoryCard 
            ratingDetails={this.state.vehicleRate}
            commentDetails={this.state.vehicleComment}
            key={dis.id}
            details={dis}
           
            />
        ));
        
        return (
            <div className={classes.Container}>
                <h6 style={{textAlign: 'center', fontFamily: 'roboto', fontSize: '2em'}}>Vehicle History</h6>
                {
                    this.state.vehicles.length === 0
                    ? <div style={{marginBottom: '500px', textAlign: 'center'}}>No Vehicles have been bought or rented</div>
                    : null
                }
                {display}
            </div>

        );  
    }
}

export default VehicleHistory;