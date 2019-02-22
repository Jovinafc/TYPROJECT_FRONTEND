import React, { Component } from 'react';
import Card from '../../components/UI/Card/Card';
import classes from './Cards.module.css';
import { connect} from 'react-redux';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import CheckBox from '@material-ui/core/Checkbox';
import Collapsible from 'react-collapsible';
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import axios from 'axios';
// import Aux from '../../hoc/Auxilary';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import store from '../../store/reducers/auth';
import InputRange from 'react-input-range';
import Picky from 'react-picky';
import "react-picky/dist/picky.css";
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import zIndex from '@material-ui/core/styles/zIndex';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;



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
            display: [],
            vehicles: [],
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
            price_range: []

        }
    }

    

    getVehicleDetails = () => {
        axios.post('/fetch-vehicles-except-current-user', {user_id: this.props.user_id}).then(result => {
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
    priceRangeHandler = (e) => {
        console.log(e);
        // this.setState({
        //     price: { min: min, max: max }
        // })
    }

    // selectMultipleOption(value) {
    //     // this.setState({ regStateSelected: value });
    //     this.setState({
    //         regStateSelected: value            
    //     })
    //   }

        selectMultipleState = (value) => {
            this.setState({
                regStateSelected: value
            })
        }

        state_Builder = () => {
            let arr = this.state.regStateSelected;
            let str = arr.join();
            console.log('state_type='+str);
        }
  

      selectMultipleKm_Driven = (value) => {
        this.setState({
            kmDrivenSelected: value            
        })
      }

      km_drivenBuilder = () => {
        let arr = this.state.kmDrivenSelected;
        let str = arr.join();
        console.log('km_driven='+str);
    }

   
    tooltip = { placement: 'After', isVisible: true, showOn: 'Always' };

     ticks= { placement: 'After', format: 'C2', largeStep: 20, smallStep: 10, showSmallTicks: true };

      serviceHandler = (e) => {
          console.log(e);
          console.log(e.target.checked)
          console.log(e.target.value)
          if(e.target.checked){
              this.setState({ 
                    service_type: [
                        ...this.state.service_type,
                        e.target.value    
                    ]                  
                }, () => {
                    this.service_typeBuilder();
                })
              
          }
          else {
              console.log('unchecked')
              this.setState({
                  service_type: this.state.service_type.filter(type => {
                      return type !== e.target.value;
                  })
              },() => {
                 this.service_typeBuilder();
              })
          }
          
        //   this.vehicle_typeBuilder();
      }

      service_typeBuilder = () => {
          let arr = this.state.service_type;
          let str = arr.join();
          console.log('service_type='+str);
      }

      vehicle_typeHandler = (e) => {
        if(e.target.checked){
            this.setState({ 
                  vehicle_type: [
                      ...this.state.vehicle_type,
                      e.target.value    
                  ]                  
              })
            
        }
        else {
            console.log('unchecked')
            this.setState({
                vehicle_type: this.state.vehicle_type.filter(type => {
                    return type !== e.target.value;
                })
            })
        }
      
      }

      vehicle_typeBuilder = () => {
        let arr = this.state.vehicle_type;
        let str = arr.join();
        console.log('vehicle_type='+str);
    }

      fuel_typeHandler = (e) => {
        if(e.target.checked){
            this.setState({ 
                  fuel_type: [
                      ...this.state.fuel_type,
                      e.target.value    
                  ]                  
              })
            
        }
        else {
            console.log('unchecked')
            this.setState({
                fuel_type: this.state.fuel_type.filter(type => {
                    return type !== e.target.value;
                })
            })
        }
      
      }

      fuel_typeBuilder = () => {
          let arr = this.state.fuel_type;
          let str = arr.join();
          console.log('fuel_type'+str);
      }
      
    render () {

     //   let displayNav = this.state.display.map(dis => (
     //       <Card name={dis.User_Name} userid={dis.UserId} key={dis.id}/>
     //   ));

        console.log(this.state.service_type);
        console.log(this.state.vehicle_type);
        console.log(this.state.fuel_type);
        console.log(this.state.regStateSelected);
        console.log(this.state.kmDrivenSelected);

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

        let displayVehicle = this.state.vehicles
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
                        <input type="checkbox" name="vehicle_type" value="4-Wheelers" onChange={this.vehicle_typeHandler}/> 4-Wheelers &nbsp; 
                         <input type="checkbox" name="vehicle_type" value="2-Wheelers" onChange={this.vehicle_typeHandler}/> 2-Wheelers < br/>               
                                     
                        </Panel>

                        
                        <Panel header="Fuel Type" headerClass="my-header-class">
                        <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Diesel" /> Diesel &nbsp;
                         <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Petrol" /> Petrol &nbsp;
                         <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Cng" /> CNG
                                     
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
                            dropdownHeight={600}

                        />

                        <div style={{height: '400px'}}>
                            
                        </div>

                        </Panel>

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

                        
                        <Panel header="Price Range" headerClass="my-header-class">
                        <Range min={0} max={1000000} onChange={this.priceRangeHandler} defaultValue={[3, 10]} tipFormatter={value => `${value}Rs`} />

                        </Panel>



                  </Collapse>

                    {/* <div className={classes.type}>
                         <h6>Type of Service</h6> 

                         <input type="checkbox" name="vehicle_type" value="Sale" /> Sale &nbsp; 
                         <input type="checkbox" name="vehicle_type" value="Rent" /> Rent < br/>               
                    </div> */}

                     {/* <div >
                         <h6>Vehicle Type </h6> 

                         <input type="checkbox" name="vehicle_type" value="4-Wheelers" /> 4-Wheelers &nbsp; 
                         <input type="checkbox" name="vehicle_type" value="2-Wheelers" /> 2-Wheelers < br/>               
                                         


                     </div> */}

                     {/* <div className={classes.type}>
                         <h6>Fuel Type</h6> 

                         <input type="checkbox" name="fuel_type" value="Diesel" /> Diesel &nbsp;
                         <input type="checkbox" name="fuel_type" value="Petrol" /> Petrol &nbsp;
                         <input type="checkbox" name="fuel_type" value="Cng" /> CNG
                     </div> */}

                    {/* <div>
                    <InputRange
                         maxValue={20}
                         minValue={0}
                         value={this.state.price}
                         onChange={this.priceRangeHandler} />
                    </div> */}
{/* 
                    <div >
                        <h6>Select State</h6>
                        <Picky 
                            value={this.state.regStateSelected}
                            // open={true}
                            options={this.state.reg_state}
                            includeFilter={true}
                            dropdownHeight={600}
                            onChange={this.selectMultipleOption}
                            valueKey="id"
                            labelKey="name"
                            multiple={true}
                            includeSelectAll={true}
                            dropdownHeight={600}

                        />


                    </div> */}

                    {/* <div className={classes.type}>
                         <h6>Fuel Type</h6> 

                         <input type="checkbox" name="fuel_type" value="Diesel" /> Diesel &nbsp;
                         <input type="checkbox" name="fuel_type" value="Petrol" /> Petrol &nbsp;
                         <input type="checkbox" name="fuel_type" value="Cng" /> CNG
                     </div> */}


                    {/* <div >
                        <h6>Km_Driven</h6>
                        <Picky 
                            value={this.state.kmDrivenSelected}
                            // open={true}
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


                    </div> */}
{/* 
                    <div className={classes.slider}>
                     <div className="sliderwrap">
                        <div className="labeltext">Range</div>
                    <SliderComponent style={{width: '90%', marginLeft: '5%'}} ticks={this.ticks} tooltip={this.tooltip} id='range' type='Range' value={[30, 70]} />
                        </div>
                    </div> */}

                    
                    {/* <div className={classes.slider}>
                     <div className="sliderwrap">
                        <div className="labeltext">Price Range</div>
                        <Range min={0} max={1000000} onChange={this.priceRangeHandler} defaultValue={[3, 10]} tipFormatter={value => `${value}Rs`} />

                        </div>
                    </div> */}


                    {/* <Accordion className={classes.accordion}>
                        <AccordionItem className={classes.accordionItem}>
                            <AccordionItemTitle className={classes.accordion__title}>
                                <h3>Simple title</h3>
                            </AccordionItemTitle>
                            <AccordionItemBody className={classes.accordion__body}>
                                <p>Body content</p>
                            </AccordionItemBody>
                         </AccordionItem>
                     </Accordion>
 */}

                     {/* <Collapse accordion={true}>
    <Panel header="hello" headerClass="my-header-class">this is panel content</Panel>
    <Panel header="title2">this is panel content2 or other</Panel>
  </Collapse> */}


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