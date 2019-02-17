import React, { Component} from 'react';
import classes from './HomePage.module.css';
import Image from './Vehicle.v1.jpg';
// import ImageSlider from '../../components/ImageSlider/ImageSlider';
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from 'react-bootstrap/Carousel'
import { NavLink } from 'react-router-dom';
import photo from '../../Images/signupmod.jpg'

class HomePage extends Component {
    render () {
        return (

                // // <div className={classes.container}>
                // {/* <Carousel className={classes.carousel} autoPlay>
                //     <div>
                //         <img src="http://res.cloudinary.com/beast0013/image/upload/v1548216751/geqnk9bclpaqboxkn2fc.jpg" />
                //     </div>
                //     <div>
                //         <img src="http://res.cloudinary.com/beast0013/image/upload/v1548216854/xt5ed7hm1halodsi8qbm.jpg"/>
                //     </div>
                //     <div>
                //         <img src="http://res.cloudinary.com/beast0013/image/upload/v1548243037/tgbmbyzowukhndhfkhfn.jpg"/>
                //     </div>
                // </Carousel> */}

                // {/* <img className={classes.img} src={Image} alt="Vehicle"/>

                //     <div className={classes.margin}>
                //         <button className={classes.b1}>Sell Now</button>
                //         <button className={classes.b2}>Lend Now</button>
                //         <br />
                //         <button className={classes.b3}>Rent Now</button>
                //         <button className={classes.b4}>Buy Now</button>
                //     </div>                     */}

                     
                <div className={classes.home}>

                    {/* <h3 style={{color: "white"}}>
                        Hello World     
                    </h3>     */}

                    <div className={classes.aboveCarousel}>
                        
                    </div>

                    <div>
                    <Carousel className={classes.carousel}>
                        <Carousel.Item>
                        {/* <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548216751/geqnk9bclpaqboxkn2fc.jpg" /> */}
                        <img className={classes.Image} src={photo} />

                        </Carousel.Item>

                        <Carousel.Item>
                        <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548216854/xt5ed7hm1halodsi8qbm.jpg"/>

                        </Carousel.Item>

                        <Carousel.Item>
                        <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548243037/tgbmbyzowukhndhfkhfn.jpg"/>
  
                        </Carousel.Item>
                    </Carousel> 
                    </div>

                    <div className={classes.fourDivs}>
                                 
                                 
                                 
                                  <div className={classes.firstDiv}>
                                       <NavLink to="/display">Buy any Vehicle</NavLink>  
                                  </div>

                                  <div className={classes.secondDiv} >
                                       <NavLink  to="/display">Rent any Vehicle</NavLink>  
                                  </div>
                                   
                                   <div className={classes.thirdDiv}>
                                         <NavLink  to="/sell/sell">Sell your Vehicle</NavLink>  
                                  </div>

                                  
                                  <div className={classes.fourthDiv}>
                                         <NavLink  to="/sell/lend">Lend your Vehicle</NavLink>  
                                  </div>
                                  

                    </div>
                 </div>
                )
    }
}

export default HomePage;