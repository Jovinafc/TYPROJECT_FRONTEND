import React, { Component } from 'react';
import Card from '../../components/UI/Card/Card';
import classes from './Cards.module.css';
import { connect} from 'react-redux';
import * as actions from '../../store/actions/vehicle_click';
import Spinner from '../../components/UI/Spinner/Spinner';
import CheckBox from '@material-ui/core/Checkbox';
import Collapsible from 'react-collapsible';
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import Aux from '../../hoc/Auxilary';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

function searchingFor(term) {
    return function(x) {
        return x.brand.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class Cards extends Component {
    state = {
        display: [],
        vehicles: this.props.vehicles,
        user_id: this.props.user_id,
        term: ''
    }

    componentDidMount () {
        this.props.onFetchVehicles(this.props.user_id);
    }

    searchHandler = (e) => {
        this.setState({term: e.target.value})
    }

    
   
    render () {
     //   let displayNav = this.state.display.map(dis => (
     //       <Card name={dis.User_Name} userid={dis.UserId} key={dis.id}/>
     //   ));

        console.log(this.props.vehicles);
        console.log(this.props.user_id);

        // let filter = this.state.vehicles => {
        //     return this.props.vehicles.filter(dis => dis.user_id !== this.props.user_id);
        // }

        // let displayVehicle = this.props.vehicles.filter(di => di.user_id !== this.props.user_id)
        // .map((dis,index) => {
        //     return (
        //     <Card className={classes.card} name={dis.brand} vehicle_id={dis.vehicle_id} key={dis && dis.id ? dis.id : index} model={dis.model} 
        //     price={dis.price} 
        //     image={dis.image}/>
        //     );
        //  })

        //  console.log(displayVehicle);


        // const myItems = this.props.vehicles;
        // console.log(myItems);
        // const newArray = myItems.filter(item => item.user_id !== this.props.user_id);
        // console.log(newArray);

        console.log(this.state.vehicles);
        console.log(this.state.user_id);

        // let displayVehicle = this.props.vehicles
        // .filter(dis => {
        //     return dis.user_id !== this.props.user_id; 
        // })
        // .map(dis => {
            
        //     return (
        //     <Card className={classes.card} name={dis.brand} user_id={dis.user_id} vehicle_id={dis.vehicle_id} key={dis.id} model={dis.model} 
        //        price={dis.price} 
        //        image={dis.image}
        //        price_per_day={dis.price_per_day}
        //        />

        //     )
               
        //     });

        let displayVehicle = this.props.vehicles
        .filter(searchingFor(this.state.term))
        .map(dis => {
            
            return (
            <Card className={classes.card} name={dis.brand} user_id={dis.user_id} vehicle_id={dis.vehicle_id} key={dis.id} model={dis.model} 
               price={dis.price} 
               image={dis.image}
               price_per_day={dis.price_per_day}
               />

            )
               
            });

        console.log(displayVehicle);
        if(this.props.loading){
            displayVehicle = <Spinner />
        }
      
        return (

            <Aux>

            <div className={classes.search}>
            <form>
            <input type="text" 
                    value={this.state.term}
                    onChange={this.searchHandler}
            />

            </form>
             </div>    

            <div className={classes.Container}>

                

                <div className={classes.Menu}>
                    <h5>Filter</h5>
                    
                    <Collapsible trigger="Vehicle Type">
                    <div className={classes.Type}>
                        <h6>Vehicle Type-</h6>
                        4-Wheelers:<CheckBox />
                        2-Wheelers:<CheckBox />
                    </div>
                    </Collapsible>

                    <Accordion>
                        <AccordionItem style={{width: '100%'}}>
                            <AccordionItemTitle>
                                <h5>Fuel Type</h5>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                            Petrol <CheckBox /> <br/>
                            CNG <CheckBox />    <br/>
                            Diesel <CheckBox /> <br/>
                            </AccordionItemBody>
                        </AccordionItem>
                    </Accordion>


                   
                    <div className={classes.fuel}>
                        <h6>Fuel Type</h6>
                        
                    </div>
                    
                    

                </div>
                <div className={classes.Main}>  
                    {displayVehicle}
                </div>
            </div>

            </Aux>
        )

    }
}

const mapStateToProps = state => {
    return {
    loading: state.vehicle.loading,
    vehicles: state.vehicle.vehicles,
    user_id: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchVehicles: (user_id) => dispatch(actions.fetchVehicles(user_id))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Cards);