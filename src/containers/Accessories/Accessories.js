import React, { Component} from 'react';
import classes from './Accessories.module.css';
import Accessory from './Accessory/Accessory';

function searchingFor(term) {
    return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}


class Accessories extends Component {

    state = {
        products: [
            {name: 'Helmets', price: '500'},
            {name: 'Gloves', price: '350'}
        ],
        term: ''
    }

    render () {

        let displayProducts = this.state.products
        .filter(searchingFor(this.state.term))
        .map(dis => {
            
            return (
            <Accessory className={classes.card} name={dis.name} user_id={dis.user_id} vehicle_id={dis.vehicle_id} key={dis.id} model={dis.model} 
               price={dis.price} 
               image={dis.image}
               />

            )
               
            });

        return (
            <div>

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