import React, { Component} from 'react';
import classes from './HomePage.module.css';
import Image from './Vehicle.v1.jpg';
// import ImageSlider from '../../components/ImageSlider/ImageSlider';
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from 'react-bootstrap/Carousel'


class HomePage extends Component {
    render () {
        return (

                <div className={classes.container}>
                {/* <Carousel className={classes.carousel} autoPlay>
                    <div>
                        <img src="http://res.cloudinary.com/beast0013/image/upload/v1548216751/geqnk9bclpaqboxkn2fc.jpg" />
                    </div>
                    <div>
                        <img src="http://res.cloudinary.com/beast0013/image/upload/v1548216854/xt5ed7hm1halodsi8qbm.jpg"/>
                    </div>
                    <div>
                        <img src="http://res.cloudinary.com/beast0013/image/upload/v1548243037/tgbmbyzowukhndhfkhfn.jpg"/>
                    </div>
                </Carousel> */}
                {/* <img className={classes.img} src={Image} alt="Vehicle"/>

                    <div className={classes.margin}>
                        <button className={classes.b1}>Sell Now</button>
                        <button className={classes.b2}>Lend Now</button>
                        <br />
                        <button className={classes.b3}>Rent Now</button>
                        <button className={classes.b4}>Buy Now</button>
                    </div>                     */}

                    <div className={classes.space}>
                        Space
                    </div>
                    <Carousel className={classes.carousel}>
                        <Carousel.Item>
                        <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548216751/geqnk9bclpaqboxkn2fc.jpg" />
                        </Carousel.Item>

                        <Carousel.Item>
                        <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548216854/xt5ed7hm1halodsi8qbm.jpg"/>

                        </Carousel.Item>

                        <Carousel.Item>
                        <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548243037/tgbmbyzowukhndhfkhfn.jpg"/>
  
                        </Carousel.Item>
                    </Carousel>
                </div>
                )
    }
}

export default HomePage;