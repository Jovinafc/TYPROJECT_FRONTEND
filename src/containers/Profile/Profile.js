import React, {Component} from 'react'
import classes from './Profile.module.css';
import Aux from '../../hoc/Auxilary';
import { NavLink} from 'react-router-dom';
import {withRouter, Route, Switch} from 'react-router-dom';
import AccountInfo from './AccountInfo/AccountInfo';
import Delete from './Delete/Delete';
import Photo from './Photo/Photo';
import ProfInfo from './ProfInfo/ProfInfo';
import ProfNav from './ProfNav/ProfNav';


class Profile extends Component {
    state= {
        profile: true,
        photo: false,
        account: false,
        close : false,
    }

    profileHandler = () => {
        this.setState({profile: true,photo: false, account: false, close: false})
    }

    photoHandler = () => {
        this.setState({photo: true, profile: false, account: false, close: false})
    }

    accountHandler = () => {
        this.setState({account: true, photo: false, profile: false, close: false})
    }

    close = () => {
        this.setState({close: true, account: false, profile: false, photo: false})
    }

    render () {
        let main= <ProfInfo />

        // let main = (
        //     <Switch>
        //         <Route path="/profile" exact component={ProfInfo} />
        //         <Route path="/photo" exact component={Photo} />
        //         <Route path="/account" exact component={AccountInfo} />
        //         <Route path="/delete" exact component={Delete} /> 
        //     </Switch>
        // )

        // if(this.state.photo === true) {
        //     main = <Photo />
        // }

        // if(this.state.account) {
        //     main = <AccountInfo />
        // }
        // if(this.state.close) {
        //     main = <Delete />
        // }

        return (
            <Aux>
                <div className={classes.Container}>

                    <div className={classes.Menu}>  

                        <ProfNav />

                          {/* <ul className={classes.ul}>
                             {this.state.profile
                             ? <li className={classes.list}><a onClick={this.profileHandler}>Profile</a></li>
                             : <li className={classes.li}><a onClick={this.profileHandler}>Profile</a></li>

                            }

                             {this.state.photo 
                              ? <li className={classes.list}><a onClick={this.photoHandler}>Photo</a></li>
                              : <li className={classes.li}><a onClick={this.photoHandler}>Photo</a></li>
                              }   

                              {this.state.account
                                ? <li className={classes.list}><a onClick={this.accountHandler}>Account Info</a></li>
                                : <li className={classes.li}><a onClick={this.accountHandler}>Account Info</a></li>
                                }
                              
                              {this.state.close
                              ? <li className={classes.list}><a onClick={this.close}>Delete Account</a></li>
                              : <li className={classes.li}><a onClick={this.close}>Delete Account</a></li>
                              } */}

                              {/* <li className={classes.li}><a onClick={this.profileHandler}>Profile</a></li>
                              <li className={classes.li}><a onClick={this.photoHandler}>Photo</a></li>
                              <li className={classes.li}><a onClick={this.accountHandler}>Account Info</a></li>
                              <li className={classes.li}><a onClick={this.close}>Delete Account</a></li> */}
                         {/* </ul> */}

                    </div>  

                      {/* <div className={classes.Menu}>  
                          <ul className={classes.ul}>
                              <li className={classes.li}><NavLink to="/profile">Profile</NavLink></li>
                              <li className={classes.li}><NavLink to="/photo">Photo</NavLink></li>
                              <li className={classes.li}><NavLink to="/account">Account Info</NavLink></li>
                              <li className={classes.li}><NavLink to="/delete">Delete Account</NavLink></li>
                         </ul>

                    </div>  
     */}

                    <div className={classes.Main}>
                        {main}
                    </div>
                </div>        
            </Aux> 
       )
    }
} 

export default Profile;