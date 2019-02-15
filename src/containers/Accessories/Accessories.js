import React, { Component} from 'react';
import classes from './Accessories.module.css';
import Accessory from './Accessory/Accessory';
import axios from 'axios';

function searchingFor(term) {
    return function(x) {
        return x.accessory_name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}


class Accessories extends Component {

    state = {
        products: [],
        term: ''
    }

    componentDidMount = () => {
        axios.post('/fetch-accessories')
        .then(response => {
            console.log(response);
            this.setState({products: response.data})
        })
    }

    searchHandler = (e) => {
        this.setState({term: e.target.value})
    }
    render () {

        let displayProducts = this.state.products
        .filter(searchingFor(this.state.term))
        .map(dis => {
            
            return (
            <Accessory className={classes.card} id={dis.accessory_id} name={dis.accessory_name} key={dis.accessory_id}  
               price={dis.accessory_price}
               type={dis.accessory_type}
               use={dis.accessory_use}
               qty={dis.accessory_qty}
               image={dis.accessory_image}
               />

            )
               
            });

        return (
            <div className={classes.big}>

            <div className={classes.search}>
            <form>
            <input type="text" 
                    value={this.state.term}
                    onChange={this.searchHandler}
            />

            </form>
             </div>    

            <div>
                <div className={classes.Container}>
                    <div className={classes.Menu}>
                        <h5> Filter </h5>

                    </div>
                    <div className={classes.Main}>  
                        {displayProducts}
                    </div>
                </div>

            </div>
            </div>
        )
    }
}   

export default Accessories;