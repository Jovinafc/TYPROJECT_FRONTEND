import React, {Component} from 'react';
import classes from './VehicleHistory.module.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import axios from 'axios';
import VehicleHistoryCard from '../../components/UI/VehicleHistory/VehicleHistoryCard'; 


class VehicleHistory extends Component {

    state = {
        vehicles : []
    }

    componentDidMount = () => {
        console.log("Inside Vehicle History");
        axios.post('/vehicle-history', {user_id: localStorage.getItem('userId')})
        .then(response => {
            console.log(response.data);
            // this.setState({
            //     vehicles: response.data
            // })
            const vehiclesHist = [];
            for(let key in response.data){
                vehiclesHist.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({
                vehicles: vehiclesHist
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render () {

        let display ;

        if(this.state.vehicles === null){
            display = <h4>Nothing to Show</h4>
        }
        display = this.state.vehicles.map(dis => (
            <VehicleHistoryCard 
            key={dis.id}
            details={dis}
            />
        ));
        
        return (
            <div className={classes.Container}>
                <h6>Vehicle History</h6>
                {display}
            </div>

        );  
    }
}

export default VehicleHistory;