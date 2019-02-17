import React, {Component} from 'react';
import classes from './SellVehicle.module.css';
import { Form } from 'shineout';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Tabs from './Tabs/Tabs';
import { connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import Aux from '../../hoc/Auxilary';

class SellVehicle extends Component {

    notify = () => toast("Ad Posted Successfully!");
    state = {
        formdata: {
            user_id: localStorage.getItem('userId'),
            type: '',
            brand: '',
            model: '',
            fuel: '',
            year: '',
            registration_state: '',
            km_driven: '',
            number_plate: '',
            price: '',
            image: '',
            documents: '',
            
        },
        types: [],
        brands: [],
        models: [],
        year: [],
        fuels: [],
        reg_state : [],
        km_driven: [],
        file: '',
        docfile: '',
        imagePrev: '',
        documentPrev: '',
        tempBrand: '',
        tempModel: '',
        tempType: '',
        sample: '',
        show: false
    }

    details = () => {
        axios.get('/fetch-year').then(result => {
            this.setState({year: result.data})
        });

        
        axios.get('/fetch-registration-state').then(result => {
            this.setState({reg_state: result.data})
        });

        axios.get('/fetch-km_driven').then(result => {
            this.setState({km_driven: result.data})
        });

    }


    componentDidMount () {
        const header = {
            'x-auth' : localStorage.getItem('token')
        }

        if(this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''){
            this.setState({show: true})
        }

        axios.get('/fetch-vehicle-type').then(result => {
            this.setState({types: result.data})
            console.log(result);
        })
        .catch(err => {
            console.log(err.response.data);
        });

        this.details(); 
    }

    handleClose = () =>  {
        this.setState({
            show: false
        })
      }
    

   selectChangedHandlerType = (e) => {
       this.setState({
           formdata: {
               ...this.state.formdata,
               type: e.target.value,
               km_driven: '',
               registration_state: '',
               fuel: '',
               year: '',
               image: '',
               model: '',
               brand: ''
           },
           brands: [],
           models: [],
           year: [],
           reg_state: [],
           km_driven: [],
           tempType: e.target.value,
           file: '',
           docfile: '',
           imagePrev: '',
           documentPrev: '',
           tempBrand: '',
           tempModel: ''
       })

       if(e.target.value === 'Two-Wheelers'){
           axios.get('/fetch-twoWheeler-brand').then(result => {
                this.setState({brands: result.data});
           });

           axios.get('/fetch-twoWheeler-fuel').then(result =>{
                this.setState({fuels: result.data})
           });

           this.details();
        }
        else {
            axios.get('/fetch-fourWheeler-brand').then(result => {
                this.setState({brands: result.data});
           });
           axios.get('/fetch-fourWheeler-fuel').then(result =>{
            this.setState({fuels: result.data})
       });

            this.details();
        }
 }

 
    selectChangedHandlerBrand = (e) => {
        e.preventDefault();
        if(e.target.value === 'Others'){
            this.setState({
                tempBrand: e.target.value,
                formdata: {
                    ...this.state.formdata,
                    brand: ''
                }
            });
        }
        
        else { 
        this.setState({
            tempBrand: e.target.value,
            formdata: {
                ...this.state.formdata,
                brand: e.target.value
            }
        });

        if(this.state.tempType === 'Four-Wheelers'){
             axios.post('/fetch-fourWheeler-model', {brand: e.target.value})
             .then((result) => {
                 this.setState({models: result.data})
             }).catch(e => {
                 console.log(e);
             })
        }
        else if(this.state.tempType === 'Two-Wheelers'){
            axios.post('/fetch-twoWheeler-model', {brand: e.target.value})
            .then((result) => {
                this.setState({models: result.data})
            }).catch(e => {
                console.log(e);
            })
       }
    }
}

    selectChangedHandlerModel = (e) => {
        if(e.target.value === 'Others'){
            this.setState({
                tempModel: e.target.value,
                formdata: {
                    ...this.state.formdata,
                    model: ''
                }
            });
        }
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                model: e.target.value
            },
            tempModel: e.target.value
        })
    }

    selectChangedHandlerYear = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                year: e.target.value
            }
        })
    }
    selectChangedHandlerKm = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                km_driven: e.target.value
            }
        })
    };

    selectChangedHandlerReg = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                registration_state: e.target.value
            }
        })
    };

    selectChangedHandlerFuel = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                fuel: e.target.value
            }
        })
    }

    selectChangedHandlerName = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                number_plate: e.target.value
            }
        })
    }
    
    selectChangedHandlerPrice = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                price: e.target.value
            }
        })
    }
    formSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData();
        fd.append('image',this.state.formdata.image);
        axios.post('/image',fd).then(()=>{
            console.log('Image Sent');
           this.setState({imagePrev:''});

    
    }).catch(e=>console.log(e));
    
    axios.post('/store-vehicle-details',{vehicles:this.state.formdata})
    .then((post) => {
        console.log("Data Sent", post);
        this.notify();
        this.setState({
            formdata: {
                type: '',
                brand: '',
                model: '',
                registration_state: '',
                fuel: '',
                image: '',
                document: '',
                price: '',
                year: '',
                km_driven: '',
                number_plate: '',
                user_id: this.props.user_id
              },
              imagePrev: '',
              documentPrev: ''
        }) 

    }).catch(e=>{
        console.log(e)

    })

    }

      handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file)
        if(file===undefined)
        {
            this.setState({imagePrev:null,})
        }

        reader.onload = (e) => {
          this.setState({
            file: file,
            sample: e.target.result,
            imagePrev: reader.result,
            formdata: {
                ...this.state.formdata,
                image: file
            }
           
          });
          console.log(this.state.formdata.image)
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                imagePrev: ''
            })
        }
        
     }
     
     handleDocumentChange = (e) => {
         e.preventDefault();
        
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file === undefined) {
            this.setState({ documentPrev: null})
        }
        reader.onload = (e) => {
            this.setState({
                docfile: file,
                documentPrev: reader.result,
                formdata: {
                    ...this.state.formdata,
                    documents: file
                }
            });
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                documentPrev: ''
            })
        }
     }
    
      inputChangedHandlerBrand = (e) => {
          e.preventDefault();
          this.setState({
            formdata: {
                ...this.state.formdata,
                brand: e.target.value
            }
          })
      }

      inputChangedHandlerModel = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                model: e.target.value
            }
        })
      }

  render () {

      

      console.log(this.state);
      console.log(this.state.imagePrev + "image preview");
    let {imagePrev} = this.state;
    let imagePreview = null;
    if (imagePrev) {
      imagePreview = (<img alt="" className={classes.Image} src={imagePrev} />);
    }

    let {documentPrev} = this.state;
    let documentPreview = null;
    if(documentPrev) {
        documentPreview = (<img alt="document" className={classes.Image} src={documentPrev} />);
    }
    

    let alternate = null;
    if(this.state.tempBrand === 'Others') {
        alternate = (<TextField label="Brand" placeholder="Enter your Vehicle Brand" className={classes.other} onChange={this.inputChangedHandlerBrand} />);
    }
    

    let alternateM = null;
    if(this.state.tempBrand === 'Others' || this.state.tempModel === 'Others') {
        alternateM = (<TextField label="Model " placeholder="Enter your Vehicle Model" className={classes.other} 
        onChange={this.inputChangedHandlerModel}/>);
    }
    
    const options1 = this.state.types.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Type</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options2 = this.state.brands.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Brand</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options3 = this.state.models.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Model</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options4 = this.state.year.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Year</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options5 = this.state.fuels.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Fuel Type</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options6 = this.state.reg_state.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the state</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options7 = this.state.km_driven.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the KM Driven</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    console.log(this.state.formdata);

    return (
        <Aux>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                    Kindly Update your profile before posting an ad
                </Modal.Body>
                <Modal.Footer>
                    <NavLink to="/Profile">
                        Go To Profile Page
                    </NavLink>
                        
                </Modal.Footer>
            </Modal>
        <div  className={classes.Box} >

            <Tabs />

        <div>
        
            <h2 style={{textAlign:'center', paddingBottom:'15px'}}>Sell</h2>
            <Form className={classes.Sell}>

                        <div className={classes.firstDiv}>
                       <div className={classes.divs}> 
                      <label htmlFor="type" className={classes.Label}>Vehicle Type:</label>  
                      <Select
                             id="type" 
                             name="type"
                             className={classes.select} 
                             onChange={this.selectChangedHandlerType}
                             value={this.state.formdata.type}
                        >
                        {options1}
                        </Select>
                        </div>
                        </div>

                        <div className={classes.secondDiv}>
                        <div >
                        <label htmlFor="brand"  style={{marginBottom: '-10px'}}className={classes.Label}>Vehicle Brand:</label>
                        
                        <Select 
                            id="brand"
                            name="brand"
                            value={this.state.formdata.brand}
                            className={classes.select}
                           onChange= {this.selectChangedHandlerBrand}
                        >
                        {options2}
                        </Select>
                        <p className={classes.or} style={{marginBottom: '0px'}}>Select others if brand not present</p> 
                         {alternate}
                        </div>

                        <div >
                        <label htmlFor="model"  style={{marginBottom: '-15px'}}className={classes.Label}>Vehicle Model:</label>
                        <Select 
                            id="model"
                            name="model"
                            value={this.state.formdata.model}
                            className={classes.select}
                           onChange= {this.selectChangedHandlerModel}
                        >
                        {options3}
                        </Select>
                        <p className={classes.or} style={{marginBottom: '2px'}}>Select others if model not present</p>
                        {alternateM}
                        </div>
                        
                        
                        <div >    


                        <label htmlFor="year" className={classes.Label}>Vehicle Year:</label>
                        <Select 
                            id="year"
                            name="year"
                            value={this.state.formdata.year}
                            className={classes.select}
                           onChange= {this.selectChangedHandlerYear}
                        >
                        {options4}
                        </Select>
                        </div>

                        </div>

                        <div className={classes.thirdDiv}> 

                        <div>
                        <label htmlFor="fuel" className={classes.Label}>Fuel Type:</label>
                        <Select 
                            id="fuel"
                            name="fuel"
                            className={classes.select}
                            value={this.state.formdata.fuel}
                           onChange= {this.selectChangedHandlerFuel}
                        >
                        {options5}
                        </Select>
                        </div>

                        <div >
                        <label htmlFor="reg" className={classes.Label}>Registration State:</label>
                        <Select 
                            id="reg"
                            name="reg"
                            className={classes.select}
                            value={this.state.formdata.registration_state}
                           onChange= {this.selectChangedHandlerReg}
                        >
                        {options6}
                        </Select>
                        </div>

                        <div>
                        <label htmlFor="km" className={classes.Label}>Km Driven:</label>
                        <Select 
                            id="km"
                            name="km"
                            className={classes.select}
                            value={this.state.formdata.km_driven}
                           onChange= {this.selectChangedHandlerKm}
                        >
                        {options7}
                        </Select>
                        </div>

                        </div>
                        
                        <div className={classes.fourthDiv}>
                        <table>
                            <tbody>
                            <tr>
                                 <td><label htmlFor="number" className={classes.Label}> Vehicle Number:</label></td>
                                 <td><TextField 
                                 label="Vehicle Number" 
                                 className={classes.other} 
                                 placeholder="Enter your vehicle number" 
                                 id="number" 
                                 name="number" 
                                 value={this.state.formdata.number_plate}
                                 onChange={this.selectChangedHandlerName} /></td>
                        
                            </tr>
                        
                            </tbody>
                            <tbody>
                        <tr>
                            <td><label htmlFor="image" className={classes.Label}>Vehicle Image:</label></td>
                            <td><TextField className={classes.other}  id="image" type="file" onChange={this.handleImageChange} /></td> 
                            { imagePreview }
                        
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            
                        <td><label htmlFor="document" className={classes.Label}>Vehicle Document:</label></td>
                        <td><TextField className={classes.other}  type="file" accept="application/pdf,application/vnd.ms-excel" id="document" onChange={this.handleDocumentChange} /></td> 
                        { documentPreview }   
                        </tr>         
                        </tbody>
                        
                        <tbody>
                        <tr>
                             <td><label htmlFor="price" className={classes.Label}>Price:</label></td>
                             <td><TextField className={classes.other} value={this.state.formdata.price} placeholder="Enter the price" id="price" name="number" onChange={this.selectChangedHandlerPrice} /></td>
                         </tr>
                         </tbody>
                        

                        </table>
                        </div>
                        <button  className="btn btn-primary" onClick={this.formSubmit}>
                            Submit
                        </button>




                        <br />
                        <br /> 
            </Form>
            </div>
        </div>
        </Aux>
    );
  };
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        address: state.auth.address,
        state: state.auth.state,
        city: state.auth.city,
        pincode: state.auth.pincode,
        number : state.auth.phone_number

    }
}

export default connect(mapStateToProps, null)(SellVehicle);