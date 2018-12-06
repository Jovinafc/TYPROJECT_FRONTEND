import React, { Component}  from 'react';
//import NavigationItems from '../../components/NavigationItems/NavigationItems';
//import UserData from '../Forms/UserData/UserData';
//import Feedback from '../Forms/Feedback/Feedback';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
            
         } );
    }


    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer } 
                closed={this.sideDrawerClosedHandler} />
                <main   className={classes.Content}>
                        {this.props.children}
                </main>
          {/*  <div>
                <h1 style={{textAlign: 'center', backgroundColor: '#336699'}}>Header Section</h1>
                <h4 style={{textAlign: 'center', backgroundColor: '#5288DB' }}>
                <NavigationItems
                 />

                </h4>
                
          </div>*/}
            </Aux>
    );
    }
}

export default Layout;