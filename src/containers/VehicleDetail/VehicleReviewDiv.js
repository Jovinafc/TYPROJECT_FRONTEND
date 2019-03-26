import React, {Component} from 'react';
import classes from './VehicleReviewDiv.module.css';
import ReactStars from 'react-stars';
import axios from '../../axios';

class VehicleReviewDiv extends Component {

    state = {
        thumbsup: 0,
        thumbsdown: 0,
        initialhelpCount: 0,
        initialnothelpCount: 0
    }

    counterMethod = () => {
        axios.get(`/helpful-vehicle-count?vehicle_id=${this.props.details.vehicle_id}&feedback_id=${this.props.details.feedbacks[0].feedback_id}`)
        .then(res => {
            console.log(res.data);
            this.setState({
                initialhelpCount: res.data.countHelpful,
                initialnothelpCount: res.data.countNotHelpful
            })
        })

    }

    getLikedDetails = () => {
        axios.get(`vehicle-helpful?vehicle_id=${this.props.details.vehicle_id}&feedback_id=${this.props.details.feedbacks[0].feedback_id}&user_id=${localStorage.getItem('userId')}`)
        .then(res => {
            console.log(res.data[0]);
            if(res.data[0].helpful === '1'){
                this.setState({
                    thumbsup: parseInt(res.data[0].helpful)
                })
            }
            if(res.data[0].not_helpful === '1'){
                this.setState({
                    thumbsdown: parseInt(res.data[0].not_helpful)
                })
            }
        })
    }

    componentDidMount = () => {
        this.counterMethod();
        this.getLikedDetails();
    }

    componentDidUpdate = (prevProps) => {
        

        if(this.state.initalhelpCount !== prevProps.initalhelpCount){
            this.setState({
                initialhelpCount: this.state.initialhelpCount
            })
        }
        if(this.state.initalnothelpCount !== prevProps.initalnothelpCount){
            this.setState({
                initalnothelpCount: this.state.initialnothelpCount
            })
        }
        
        // if(this.state.thumbsup !== prevProps.thumbsup){
        //     this.setState({
        //         thumbsup: this.state.thumbsup
        //     })
        // }

        // if(this.state.thumbsdown !== prevProps.thumbsdown){
        //     this.setState({
        //         thumbsdown: this.state.thumbsdown
        //     })
        // }
    }

    up = (e) => {
        e.preventDefault();
        
        this.setState({
            thumbsup: this.state.thumbsup + 1
        })

        axios.post('helpful-not-helpful', {
            type: 'vehicle',
            helpful: 'set',
            user_id: localStorage.getItem('userId'),
            feedback_id: this.props.details.feedbacks[0].feedback_id,
            vehicle_id: this.props.details.vehicle_id
        })
        .then(res => {
            console.log(res.data);
            this.counterMethod();
            this.getLikedDetails();

        })
        .catch(err => {
            console.log(err);
            this.counterMethod();
        })
        
    }

    down = (e) => {
        e.preventDefault();
        this.setState({
            thumbsupdown: this.state.thumbsdown + 1
        })

        
        axios.post('helpful-not-helpful', {
            type: 'vehicle',
            notHelpful: 'set',
            user_id: localStorage.getItem('userId'),
            feedback_id: this.props.details.feedbacks[0].feedback_id,
            vehicle_id: this.props.details.vehicle_id
        })
        .then(res => {
            console.log(res.data);
            this.counterMethod();
            this.getLikedDetails();

        })
        .catch(err => {
            console.log(err);
            this.counterMethod();
        })
    }



    render () {
        console.log(this.props.details);    

      
       
        let rateDiv = <div>{this.props.details.ratings[0].rating_number 
                        ?   <ReactStars
                        count={5}
                        size={24}
                        value={this.props.details.ratings[0].rating_number}
                        half={false}
                        edit={false}
                        color2={'#ffd700'} />
                        : <div>Not Rated by user</div>
                        }
                         
                         </div>



        console.log(this.props.details);
        console.log(this.props.details.ratings[0].rating_number);
        

        let a = this.props.details.ratings[0].user_name.charAt(0);

        return (
            <div className={classes.mainDiv}>   
                <div className={classes.topDiv}>
                    <div className={classes.imageContainer}>
                        {/* {this.props.details.user['image']
                        ? <img className={classes.image} src={this.props.details.user['image']} alt="pfimage" /> */}
                         <h2 style={{textAlign: "center", fontSize: '20px', color: "black"}}>{a}</h2>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p>{this.props.details.ratings[0].user_name}</p>
                        <span>{this.props.details.feedbacks[0].createdAt.substring(0,10)}</span>
                    </div>      

                    <div className={classes.ratingDiv}>
                        {rateDiv}
                    </div>
                        
                </div>
                <div className={classes.downDiv}>
                    <textarea value={this.props.details.feedbacks[0].feedback_comment || ''} style={{width: '100%', height: 'auto'}}type="text" disabled={true}/>
                    
                    <div className={classes.thumbs}>
                    <div className={classes.thumbupdown}>
                    <button onClick={this.up}> 
                    {this.state.thumbsup === 1
                    ? <i  style={{color: 'blue'}} className="fas fa-thumbs-up"></i>
                    : <i  className="fas fa-thumbs-up"></i>}
                    </button>
                    <span style={{width: '10px', color: 'white'}}>d</span>Helpful    {this.state.initialhelpCount} 

                    </div>

                    <div>
                    <button onClick={this.down}>
                    {this.state.thumbsdown === 1
                    ? <i  style={{color: 'blue'}} className="fas fa-thumbs-down"></i>
                    : <i className="fas fa-thumbs-down"></i>}       
                    
                    </button>
                    <span style={{width: '10px', color: 'white'}}>d</span>
                    Not Helpful  {this.state.initialnothelpCount}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VehicleReviewDiv;