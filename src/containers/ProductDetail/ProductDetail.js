import React, {Component} from 'react';
import classes from './ProductDetail.module.css';
import axios from '../../axios';
import { NavLink} from 'react-router-dom'



class ProductDetail extends Component {

    state = {
        product: []
    }

    componentDidMount () {
        window.scrollTo(0,0);
        const {match: {params}} = this.props;
        let a = params.product_id
        a = a.substring(1);

        axios.post('/fetch-specific-accessory', {accessory_id: a})
        .then(response => {
            console.log(response);
            this.setState({
                product: response.data
            })
            console.log(this.state.product);
        })
        


    }

    render () {
        return (
            <div className={classes.Container}>
                    <h2>Product Detail</h2>

                    <div className={classes.pdcontainer}>

                        <div>
                            <h5>{this.state.product.accessory_name}</h5>
                        </div>
                        <div className={classes.imgcontainer}>
                            <img className={classes.img} src={this.state.product.accessory_image} />
                        </div>
                    </div>

                <div className={classes.buttonContainer}>

                {
                    localStorage.getItem('token') === null
                 
                 ? <div className={classes.but}>
                     <NavLink to="/login"><button className="btn btn-primary">Kindly Sign In</button></NavLink>
                   </div>  
               
                 : <div className={classes.but}>
                     {
                            <div>
                             
                             {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                             ? <NavLink to="/Profile"><button className="btn btn-primary">Update your Profile</button></NavLink>

                             : <NavLink to={'/productpayment/:'+this.state.product.accessory_id}><button className="btn btn-primary">Buy Product</button> </NavLink>
                              
                             }  
                           </div> 
                           
                                }
                            </div> 
                                  
                     }


                </div>
                                    

                    
            </div>
        )
    }
}

export default ProductDetail;