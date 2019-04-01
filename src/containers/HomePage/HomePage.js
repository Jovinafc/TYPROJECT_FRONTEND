import React, { Component} from 'react';
import classes from './HomePage.module.css';
// import Image from './Vehicle.v1.jpg';
// import ImageSlider from '../../components/ImageSlider/ImageSlider';
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from 'react-bootstrap/Carousel'
import { NavLink } from 'react-router-dom';
import photo from '../../Images/signupmod.jpg'
import axios from 'axios';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
// import RBCarousel from "react-bootstrap-carousel";
import Vehicle1 from './Vehicle 1.jpg';
// import Vehicle2 from './Vehicle 2.jpg';
// import Vehicle3 from './Vehicle 3.jpg';
// import Vehicle4 from './Vehicle 4.jpg';
import Vehicle5 from './Vehicle 5.jpg';
// import Vehicle6 from './Vehicle 6.jpg';
// import Vehicle7 from './Vehicle 7.jpg';

class HomePage extends Component {

    state = {
        vehicles: []
    }

    componentDidMount = () => {

        window.scrollTo(0, 0);

        axios.post('/fetch-vehicles-except-current-user', {user_id: localStorage.getItem('userId')}).then(result => {
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
        })
    }


    render () {
        let size = 3;
        let display = this.state.vehicles.slice(0,size).map(dis => {
            return (
                <NavLink style={{textDecoration: 'none'}} className={classes.topVehiclesDiv} key={dis.id} to={'/vehicledetail/:'+dis.vehicle_id}>
                
                    <div style={{display: 'flex',paddingLeft:'2%', paddingRight:'5%',  justifyContent: 'space-between'}}>
                    <p style={{color: 'white'}}>{dis.brand} {dis.model}</p>  
                        <p>{dis.price === null
                            ? <span className={classes.rent}>Rent</span>
                            : <span className={classes.sell}>Sale</span>}
                        </p>
                    </div>
                    <div className={classes.imageCont}>
                        <img  className={classes.image} src={dis.image} alt="Vehicle"/>
                    </div>
                
                </NavLink>
            )

        })

        return (
                     
                <div className={classes.home}>


                    <div className={classes.aboveCarousel}>
                        
                    </div>

                    <div className={classes.carouselCont}>
                    <Carousel className={classes.carousel}>
                        <Carousel.Item>
                        {/* <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548216751/geqnk9bclpaqboxkn2fc.jpg" /> */}
                        <img className={classes.Im} src={photo} alt="Vehicle " />

                        </Carousel.Item>


                        <Carousel.Item>
                        <img className={classes.Im} alt="Vehicle" src={Vehicle5}/>
  
                        </Carousel.Item>

                        <Carousel.Item>
                        <img className={classes.Im} alt="Vehicle" src={Vehicle1}/>
  
                        </Carousel.Item>


                    </Carousel> 


                    </div>

                    <div className={classes.fourDivs}>
                                 
                                 
                                 
                                  {/* <div className={classes.firstDiv}>
                                       <NavLink to="/display">Buy any Vehicle</NavLink>  
                                  </div> */}

                                <NavLink style={{textDecoration: 'none'}} className={classes.firstDiv} to="/display">  
 
                                 <span style={{fontSize: "2em", textDecoration: 'none'}}>
                                 Buy a Vehicle
                                  </span>
                                  </NavLink>

                                  <NavLink style={{textDecoration: 'none'}} className={classes.secondDiv} to="/display">
                                  <span style={{fontSize: "2em", textDecoration: 'none'}}>
                                 Rent a Vehicle
                                  </span>
                                  </NavLink >
{/*                                   
                                  <div className={classes.secondDiv} >
                                       <NavLink style={{textDecoration: 'none'}} to="/display">Rent any Vehicle</NavLink>  
                                  </div>
                                    */}

                                <NavLink style={{textDecoration: 'none'}} className={classes.thirdDiv} to="/display">
                                  <span style={{fontSize: "2em", textDecoration: 'none'}}>
                                 Sell your Vehicle
                                  </span>
                                  </NavLink >

                                   {/* <div className={classes.thirdDiv}>
                                         <NavLink  to="/sell/sell">Sell your Vehicle</NavLink>  
                                  </div> */}

                                    <NavLink style={{textDecoration: 'none'}} className={classes.fourthDiv} to="/display">
                                  <span style={{fontSize: "1.9em", textAlign:"center", textDecoration: 'none'}}>
                                 Lend your Vehicle
                                  </span>
                                  </NavLink >
                                  {/* <div className={classes.fourthDiv}>
                                         <NavLink  to="/sell/lend">Lend your Vehicle</NavLink>  
                                  </div>
                                   */}

                    </div>

                    <div >
                        <h2 style={{color: 'white', textAlign: 'center'}}> Top Vehicles </h2>
                        <div className={classes.topVehicles}>
                            {display}
                        </div>
                    </div>
                 </div>
                )
    }
}

export default HomePage;