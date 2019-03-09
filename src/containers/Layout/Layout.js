import React, { Component}  from 'react';
//import NavigationItems from '../../components/NavigationItems/NavigationItems';
//import UserData from '../Forms/UserData/UserData';
//import Feedback from '../Forms/Feedback/Feedback';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import { connect } from 'react-redux';  
import TopToolbar from '../../components/TopToolbar/TopToolbar';
// import Headroom from 'react-headroom';
// import { Spinner } from '@chevtek/react-spinners';
// import LoadingOverlay from 'react-loading-overlay';


class Layout extends Component {
    state = {
        showSideDrawer: false,
        prevScrollpos: window.pageYOffset

    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
            
         } );
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }

      componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }

    handleScroll = () => {
        let currentScrollPos = window.pageYOffset;
    
        if (this.state.prevScrollpos > currentScrollPos) {
          document.getElementById("topnav").style.top = "65px";
        } else {
          document.getElementById("topnav").style.top = "-50px";
        }
        this.setState({ prevScrollpos: currentScrollPos });
      };

    render () {
        let abc = (
            <Aux>
             {/* <Headroom style={{
  webkitTransition: 'all .5s ease-in-out',
  mozTransition: 'all .5s ease-in-out',
  oTransition: 'all .5s ease-in-out',
  transition: 'all .5s ease-in-out'
}}>    */}
            {/* <LoadingOverlay active={this.props.isActive} spinner text="Loading"> */}
            <TopToolbar 
              isAuth = {this.props.isAuthenticated}
            />
           
           {/* </Headroom > */}
           <SideDrawer 
           isAuth = {this.props.isAuthenticated}
           open={this.state.showSideDrawer } 
           closed={this.sideDrawerClosedHandler} />
            
           <main   className={classes.Content}>
           <div id="topnav">
           <Toolbar 
           isAuth = {this.props.isAuthenticated}
           drawerToggleClicked={this.sideDrawerToggleHandler}
           />
           </div>
                   {this.props.children}
           </main>
    
           <div style={{textAlign: 'center', height: '200px', backgroundColor: '#747474'}}>
               <h2>Footer Section </h2>
           </div>
           {/* </LoadingOverlay> */}
           </Aux>         
        )

        // if(this.props.location.pathname === '/otp'){
        //      abc = (
        //         <Aux>
        //                <div style={{backgroundColor: "grey"}}>
        //                 <main className={classes.Content}>
        //                     {this.props.children}
        //                 </main>
        //                  </div> 
        //         </Aux>
        //     )
        // }    


        return (
            <Aux>
                {abc}
                
            </Aux>
    );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isActive: state.cart.isActive
    };
}

export default connect(mapStateToProps)(Layout);

