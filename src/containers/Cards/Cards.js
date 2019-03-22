import React, { Component } from 'react';
import Card from '../../components/UI/Card/Card';
import classes from './Cards.module.css';
import { connect} from 'react-redux';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import axios from 'axios';
// import Aux from '../../hoc/Auxilary';
// import store from '../../store/reducers/auth';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import Picky from 'react-picky';
import "react-picky/dist/picky.css";
// import zIndex from '@material-ui/core/styles/zIndex';
import Slider from 'rc-slider';
// import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
// const Handle = Slider.Handle;



function searchingFor(term) {
    return function(x) {
        return x.brand.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class Cards extends Component {
    constructor (props){
        super(props);
        this.getVehicleDetails = this.getVehicleDetails.bind(this);
        // this.selectMultipleOption = this.selectMultipleOption.bind(this);
        this.selectMultipleKm_Driven = this.selectMultipleKm_Driven.bind(this);
        this.selectMultipleState = this.selectMultipleState.bind(this);

        this.state = {
            value4: {
                min: 0,
                max:200000
            },
            display: [],
            vehicles: [],
            filter_vehicles: [],
            user_id: this.props.user_id,
            term: '',
            price: '',
            regStateSelected: [],
            reg_state: [],
            kmDrivenSelected: [],
            kmDriven: [],
            service_type: [],
            vehicle_type: [],
            fuel_type: [],
            pricemin: 0,
            pricemax: 0,    
            price_range: [],
            filterstring: '/filter?',
            filterValues: {
                vehicle_type: [],
                service_type: [],
                fuel_type: [],
                pricemin: 0,
                pricemax: 0,
                price_range: [],
                regStateSelected: [],
                kmDrivenSelected: []
            }
        }
    }

    

    getVehicleDetails = () => {
        if(localStorage.getItem('userId') === null){
            localStorage.setItem('userId','1000')
        }
        else
        axios.get(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`)
        .then(result => {
            console.log(result.data);
            const fetchedFilteredValues = [];
            for(let key in result.data){
                fetchedFilteredValues.push({
                    ...result.data[key],
                    id:key
                });
            }
            this.setState({
                filter_vehicles: fetchedFilteredValues
            })
        })
        .catch(err => {
            console.log(err);
        })

        axios.post('/fetch-vehicles-except-current-user', {user_id: this.props.user_id}).then(result => {
            console.log(result.data);
            const fetchedValues = [];
            for(let key in result.data){
                fetchedValues.push({
                    ...result.data[key],
                    id: key
                });
            }
            this.setState({vehicles: fetchedValues})
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentDidMount = () => {
        console.log(this.props.user_id);
        console.log('In cards display');        
        this.getVehicleDetails()
        // setTimeout(
        //     this.getVehicleDetails, 0
        // );
        // this.props.onFetchVehicles(this.props.user_id);

        axios.get('/fetch-registration-state').then(result => {
            this.setState({reg_state: result.data})
        });

        axios.get('/fetch-km_driven').then(result => {
            this.setState({kmDriven: result.data})
        });
       
    }

    searchHandler = (e) => {
        this.setState({term: e.target.value})
    }



    //Price Handler and Builder
    priceRangeHandler = (e) => {
        console.log(e[0]);
        console.log(e[1])
        this.setState({
            price_range: e,
            pricemin: e[0],
            pricemax: e[1],
            filterValues: {
                ...this.state.filterValues,
                pricemin: e[0],
                pricemax: e[1]   
            }
        }, () => {
            // console.log(`/filter?service_type=${this.state.service_type.join()}&vehicle_type=${this.state.vehicle_type.join()}&fuel_type=${this.state.fuel_type.join()}&regState=${this.state.regStateSelected.join()}&km_driven=${this.state.kmDrivenSelected.join()}&price_range=${this.state.price_range.join()}&user_id=${localStorage.getItem('userId')}`);
            console.log(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`);
            this.getVehicleDetails();
        })
        
    }


        //State Handler and Builder
        selectMultipleState = (value) => {
            this.setState({
                regStateSelected: value,
                filterValues: {
                    ...this.state.filterValues,
                    regStateSelected: value
                }  
            }, () => {
                this.state_Builder();
            })
        }

        state_Builder = () => {
            let arr = this.state.regStateSelected;
            let str = arr.join();
            console.log('state_type='+str);
            // console.log(`/filter?service_type=${this.state.service_type.join()}&vehicle_type=${this.state.vehicle_type.join()}&fuel_type=${this.state.fuel_type.join()}&regState=${this.state.regStateSelected.join()}&km_driven=${this.state.kmDrivenSelected.join()}&price_range=${this.state.price_range.join()}`);
            console.log(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`);
            this.getVehicleDetails();

        }
  
        //KM Driven Handler and Builder
      selectMultipleKm_Driven = (value) => {
        this.setState({
            kmDrivenSelected: value,
            filterValues: {
                ...this.state.filterValues,
                kmDrivenSelected: value
            }            
        }, () => {
            this.km_drivenBuilder();
        })
      }

      km_drivenBuilder = () => {
        let arr = this.state.kmDrivenSelected;
        let str = arr.join();
        console.log('km_driven='+str);
        // console.log(`/filter?service_type=${this.state.service_type.join()}&vehicle_type=${this.state.vehicle_type.join()}&fuel_type=${this.state.fuel_type.join()}&regState=${this.state.regStateSelected.join()}&km_driven=${this.state.kmDrivenSelected.join()}&price_range=${this.state.price_range.join()}`);
        console.log(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`);
        this.getVehicleDetails();

    }

   
    tooltip = { placement: 'After', isVisible: true, showOn: 'Always' };

     ticks= { placement: 'After', format: 'C2', largeStep: 20, smallStep: 10, showSmallTicks: true };


     // Service Type Handler and Builder
      serviceHandler = (e) => {
          if(e.target.checked){
              this.setState({ 
                    // service_type: [
                    //     ...this.state.service_type,
                    //     e.target.value    
                    // ],
                    filterValues: {
                        ...this.state.filterValues,
                        service_type: [
                            ...this.state.filterValues.service_type,
                            e.target.value
                        ]
                    }                  
                }, () => {
                    this.service_typeBuilder();
                })
              
          }
          else {
              console.log('unchecked')
              this.setState({
                  filterValues: {
                      ...this.state.filterValues,
                      service_type: this.state.filterValues.service_type.filter(type => {
                          return type !== e.target.value
                      })
                }},() => {
                 this.service_typeBuilder();
              })
          }          
      }

      service_typeBuilder = () => {
          let arr = this.state.filterValues.service_type;
          let str = arr.join();
          console.log('service_type='+str);
        //   console.log(`/filter?service_type=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.vehicle_type.join()}&fuel_type=${this.state.fuel_type.join()}&regState=${this.state.regStateSelected.join()}&km_driven=${this.state.kmDrivenSelected.join()}&price_range=${this.state.price_range.join()}`);
        console.log(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`);
        this.getVehicleDetails();

        }

      // Vehicle Type Handler and Builder       
      vehicle_typeHandler = (e) => {
        if(e.target.checked){
            this.setState({
                  filterValues: {
                      ...this.state.filterValues,
                      vehicle_type: [
                          ...this.state.filterValues.vehicle_type,
                          e.target.value
                      ]
                  } 
                //   vehicle_type: [
                //       ...this.state.vehicle_type,
                //       e.target.value    
                //   ]                  
              },() => {
                this.vehicle_typeBuilder();
            })
            
        }
        else {
            console.log('unchecked')
            this.setState({
                filterValues: {
                    ...this.state.filterValues,
                    vehicle_type: this.state.filterValues.vehicle_type.filter(type=> {
                        return type !== e.target.value
                    })
                }
}, () => {
                    this.vehicle_typeBuilder();
                })
            
        }
      }

      vehicle_typeBuilder = () => {
        let arr = this.state.filterValues.vehicle_type;
        let str = arr.join();
        console.log('vehicle_type='+str);
        // console.log(`/filter?service_type=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.fuel_type.join()}&regState=${this.state.regStateSelected.join()}&km_driven=${this.state.kmDrivenSelected.join()}&price_range=${this.state.price_range.join()}`);
        console.log(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`);
        this.getVehicleDetails();

    }

    // Fuel _type Handler and Builder
      fuel_typeHandler = (e) => {
        if(e.target.checked){
            this.setState({ 
                  filterValues: {
                      ...this.state.filterValues,
                      fuel_type: [
                          ...this.state.filterValues.fuel_type,
                          e.target.value
                      ]
                 }            
              }, () => {
                this.fuel_typeBuilder();
            })
            
        }
        else {
            console.log('unchecked')
            this.setState({
                filterValues : {
                    ...this.state.filterValues,
                fuel_type: this.state.filterValues.fuel_type.filter(type => {
                    return type !== e.target.value;
                })
                }}, () => {
                    this.fuel_typeBuilder();
                })
            
        }
        }

      fuel_typeBuilder = () => {
          let arr = this.state.filterValues.fuel_type;
          let str = arr.join();
          console.log('fuel_type'+str);
        //   console.log(`/filter?service_type=${this.state.service_type.join()}&vehicle_type=${this.state.vehicle_type.join()}&fuel_type=${this.state.fuel_type.join()}&regState=${this.state.regStateSelected.join()}&km_driven=${this.state.kmDrivenSelected.join()}&price_range=${this.state.price_range.join()}`);
        console.log(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`);
        this.getVehicleDetails();
  
      }
      
    render () {
        // console.log(this.state.filterValues);

     //   let displayNav = this.state.display.map(dis => (
     //       <Card name={dis.User_Name} userid={dis.UserId} key={dis.id}/>
     //   ));

        // console.log(this.state.service_type);
        // console.log(this.state.vehicle_type);
        // console.log(this.state.fuel_type);
        // console.log(this.state.regStateSelected);
        // console.log(this.state.kmDrivenSelected);

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

        let displayVehicle;
        if(this.state.filter_vehicles.length > 0){
            
        displayVehicle = this.state.filter_vehicles
        .filter(searchingFor(this.state.term))
        .map(dis => {
            // console.log(dis)
            return (
            
            <Card className={classes.card} name={dis.brand} user_id={dis.user_id} vehicle_id={dis.vehicle_id} key={dis.id} model={dis.model} 
               price={dis.price} 
               image={dis.image}
               year={dis.year}
               rate={dis.avg_rating_vehicles}
               price_per_day={dis.price_per_day}
               />

            )
               
            });

        }
        else {
            displayVehicle = <div style={{textAlign: 'center', fontFamily: 'Roboto', marginLeft: '30%', marginTop: '15%', fontSize: '1.5em'}}>No Vehicles match your requirements</div>

        }

        // if(this.state.vehicles.filter(searchingFor(this.state.term) === 0)){
             
        // displayVehicle = <div>No Vehicles To Show </div>    

        // }   
        // console.log(displayVehicle);
        if(this.props.loading){
            displayVehicle = <Spinner />
        }


        return (
            <div>

                

            <div className={classes.Container}>

                

                <div className={classes.Menu}>
                    <h5>Filter</h5>

                    <div className={classes.searchDiv}>
                         <form>
                         <input type="text" 
                                 value={this.state.term}
                                 onChange={this.searchHandler}
                         />

                         </form>
                   </div>

                   <Collapse accordion={true}>
                        <Panel header="Type of Service" headerClass="my-header-class">
                        <input type="checkbox" name="vehicle_type" onChange={this.serviceHandler} value="Sale" /> Sale &nbsp; 
                         <input type="checkbox" name="vehicle_type" onChange={this.serviceHandler} value="Rent" /> Rent < br/>               
                        </Panel>

                        <Panel header="Vehicle Type" headerClass="my-header-class">
                        <input type="checkbox" name="vehicle_type" value="Four-Wheelers" onChange={this.vehicle_typeHandler}/> 4-Wheelers &nbsp; 
                         <input type="checkbox" name="vehicle_type" value="Two-Wheelers" onChange={this.vehicle_typeHandler}/> 2-Wheelers < br/>               
                                     
                        </Panel>

                        
                        <Panel header="Fuel Type" headerClass="my-header-class">
                        <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Diesel" /> Diesel &nbsp;
                         <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Petrol" /> Petrol &nbsp;
                         <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="CNG" /> CNG
                                     
                        </Panel>

                        <Panel header="Select State" headerClass="my-header-class">
                        <Picky 
                            value={this.state.regStateSelected}
                            open={true}
                            options={this.state.reg_state}
                            includeFilter={true}
                            dropdownHeight={600}
                            onChange={this.selectMultipleState}
                            valueKey="id"
                            labelKey="name"
                            multiple={true}
                            includeSelectAll={true}

                        />

                        <div style={{height: '400px'}}>
                            
                        </div>

                        </Panel>
{/* 
                        <Panel header="Km Driven" headerClass="my-header-class">
                        <Picky 
                            value={this.state.kmDrivenSelected}
                            open={true}
                            options={this.state.kmDriven}
                            includeFilter={true}
                            dropdownHeight={400}
                            onChange={this.selectMultipleKm_Driven}
                            valueKey="id"
                            labelKey="km_driven"
                            multiple={true}
                            includeSelectAll={true}
                            style={{zIndex: -2 }}

                        />
                        <div style={{height: '400px'}}>

                        </div>
                
                        </Panel>
 */}
                        
                        <Panel header="Price Range" headerClass="my-header-class">
                        <Range min={0} max={100000} onChange={this.priceRangeHandler} defaultValue={[3, 10]} tipFormatter={value => `${value}Rs`} />

                        </Panel>

                        <Panel>
                        <InputRange
          maxValue={200000}
          minValue={0}
          formatLabel={value => `${value} Rs`}
          value={this.state.value4}
          onChange={value => this.setState({ value4: value })}
          onChangeComplete={value => console.log(value)} />
       
                        </Panel>



                  </Collapse>

           

                    <div style={{textAlign: 'center', marginTop: '20px'}}>   
                        <button className="btn btn-success"> Apply Filter</button>

                    </div>

                </div>
                <div className={classes.Main}>  
                    {displayVehicle}
                </div>
            </div>

            </div>
            
        )

    }
}

const mapStateToProps = state => {
    return {
     user_id: state.auth.userId,
     loading: state.vehicle.loading,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Cards);