import React, { Component} from 'react';
import classes from './Accessories.module.css';
import Accessory from './Accessory/Accessory';
import axios from 'axios';
import 'rc-collapse/assets/index.css';
import 'rc-slider/assets/index.css';


function searchingFor(term) {
    return function(x) {
        return x.accessory_name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}


class Accessories extends Component {
    constructor(props){
    super(props);
        
    this.state = {
        products: [],
        term: ''
    }

    this.myRef = React.createRef()   // Create a ref object 

    }



    componentDidMount = () => {
        // this.myRef.current.scrollTo(0, 0);
        window.scrollTo(0, 0);


        axios.post('/fetch-accessories')
        .then(response => {
            this.setState({products: response.data})
        })
    }   

    searchHandler = (e) => {
        this.setState({term: e.target.value})
    }

    priceRangeHandler = (e) => {
        // console.log(e);
        // this.setState({
        //     price: { min: min, max: max }
        // })
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
               average_rating={dis.avg_rating_accessories}
               />

            )
               
            });

        return (
            <div ref={this.myRef} className={classes.big}>

               

            <div>
                <div className={classes.Container}>
                    {/* <div className={classes.Menu}>
                        <h5 style={{color: 'white'}}> Filter </h5>

                        <div className={classes.search}>
            <form>
            <input type="text" 
                    value={this.state.term}
                    onChange={this.searchHandler}
            />

            </form>


             </div> 

                <Collapse accordion={true} > 
                        <Panel header="Vehicle Type" headerClass="my-header-class">
                        <input type="checkbox" name="vehicle_type" value="4-Wheelers" /> 4-Wheelers &nbsp; 
                         <input type="checkbox" name="vehicle_type" value="2-Wheelers" /> 2-Wheelers < br/>               
                                     
                        </Panel>

                        
                        <Panel header="Price Range" headerClass="my-header-class">
                        <Range min={0} max={10000} onChange={this.priceRangeHandler} defaultValue={[3, 10]} tipFormatter={value => `${value}Rs`} />

                        </Panel>



                </Collapse>

                    </div> */}
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