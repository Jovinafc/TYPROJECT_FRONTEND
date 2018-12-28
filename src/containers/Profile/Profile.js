import React, {Component} from 'react'
import classes from './Profile.module.css';
import Aux from '../../hoc/Auxilary';
import { NavLink} from 'react-router-dom';

class Profile extends Component {
    state= {
        profile: true,
        photo: false,
        account: false,
        close : false,
    }

    profileHandler = () => {
        this.setState({profile: true})
    }

    photoHandler = () => {
        this.setState({photo: true})
    }

    accountHandler = () => {
        this.setState({account: true})
    }

    close = () => {
        this.setState({close: true})
    }

    render () {
        let main = <div>
                        <h2> Profile Information </h2>
                   </div>
        
        return (
            <div className={classes.big}>
                <div className={classes.Container}>

                    <div className={classes.Menu}>  
                        <NavLink to=
                        "/">Home</NavLink>
                        <ul className={classes.ull}>
                            {/* <a>Profile</a>
                            <a>Photo</a> */}
                            {/* <li className={classes.li}><a >Profile</a></li> */}
                            {/* <li><a className={classes.a}>Photo</a></li>
                            <li><a className={classes.a}>Account Info</a></li>
                            <li><a className={classes.a}>Delete Account</a></li> */}
                          </ul>
                          <ul className={classes.ul}>
                              <li className={classes.li}><a className="active" href="#home">Home</a></li>
                              <li className={classes.li}><a href="/">News</a></li>
                              <li className={classes.li}><a href="#contact">Contact</a></li>
                              <li className={classes.li}><a href="#about">About</a></li>
                         </ul>

                    </div>  

                    <div className={classes.Main}>
                    <NavLink to=
                        "/">Home</NavLink>
                        <a href="/">Home Please</a>    
                        {main}
                    </div>
                </div>        
            </div>
        )
    }
} 

export default Profile;