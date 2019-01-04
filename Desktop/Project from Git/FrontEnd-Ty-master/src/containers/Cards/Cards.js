import React, { Component } from 'react';
import Card from '../../components/UI/Card/Card';
import axios from 'axios';

class Cards extends Component {
    state = {
        display: [],
        vehicles: []
    }

    componentDidMount () {
  //      axios.get('http://localhost:3001/fetch-values').then(result => {
  //          const fetchedValues = [];
  //          for(let key in result.data){
  //              fetchedValues.push({
  //                  ...result.data[key],
  //                  id: key
  //              });
  //          }
  //          this.setState({display: fetchedValues})
  //      });
//
        axios.get('http://localhost:3001/fetch-allVehicles-details').then(result => {
            const fetchedValues = [];
            for(let key in result.data){
                fetchedValues.push({
                    ...result.data[key],
                    id: key
                });
            }
            this.setState({vehicles: fetchedValues})
            console.log(this.state.vehicles);
        });

    }

   
    render () {
     //   let displayNav = this.state.display.map(dis => (
     //       <Card name={dis.User_Name} userid={dis.UserId} key={dis.id}/>
     //   ));

        let displayVehicle = this.state.vehicles.map(dis => (
            <Card name={dis.brand} key={dis.id} model={dis.model} 
            price={dis.price} />
        ));
      
        return (
            
            <div>
                {displayVehicle}
            </div>
        )
    }
}

export default Cards;