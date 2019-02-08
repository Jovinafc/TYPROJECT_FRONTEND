import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { stat } from 'fs';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const logout = () => {
      console.log('INside logout creator');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId'); 
      return {
        type: actionTypes.AUTH_LOGOUT
      };
  };
  
//   export const logoutSucceed = () => {
//       return {
//           type: actionTypes.AUTH_LOGOUT
//       }
//   };


// export const checkAuthTimeout = (expirationTime) => {
//     return {
//         type: actionTypes.AUTH_CHECK_TIMEOUT,
//         expirationTime: expirationTime  
//     };
// };


  
  export const checkAuthTimeout = (expirationTime) => {
      console.log(expirationTime);
      return dispatch => {
         setTimeout(() => {
             dispatch(logout());
         }, expirationTime * 1000) 
      };
  };
  
//   export const auth = (email, password) => {
//         return dispatch => {
//           dispatch(authStart()); 
//           const users = {
//               email: email,
//               password: password,
//           };
          
//           axios.post('/sign-in', {users: users})
//           .then(response => {
//               console.log(response.data);
//               const expirationDate = new Date(new Date().getTime() + '3600' * 1000);
//               localStorage.setItem('token', response.data.token);
//               localStorage.setItem('expirationDate', expirationDate);
//               localStorage.setItem('userId', response.data.user_id);
//               dispatch(authSuccess(response.data.token, response.data.user_id));
//               dispatch(userData(response.data.user_id));
//               dispatch(checkAuthTimeout('3600'));
//           })
//           .catch(err => {
//               console.log(err);
//               console.log(err.response.data);
//               console.log(err.message.toString());
//               dispatch(authFail(err.response.data));
//           });
//         };
//   }
  

  export const auth = (email, password) => {
    return dispatch => {
      dispatch(authStart()); 
      const users = {
          email: email,
          password: password,
      };
      
      axios.post('/sign-in', {users: users})
      .then(response => {
          console.log(response.data);
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', response.data.user_id);
          localStorage.setItem('email', email);
          dispatch(authSuccess(response.data.token, response.data.user_id));
          dispatch(userData(response.data.user_id));
          dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
          console.log(err);
          console.log(err.response.data);
          console.log(err.message.toString());
          dispatch(authFail(err.response.data));
      });
    };
}

export const authRefresh = (email, user_id) => {
    console.log(user_id +" "+email )
    return dispatch => {
        axios.get(`/getToken/${user_id}/${email}`)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(response.data.token, user_id));
            dispatch(checkAuthTimeout(response.data.expiresIn));

        })
    }
}

 // export const auth = (email, password, isSignup) => {
 //     return {
 //         type: actionTypes.AUTH_USER,
 //         email: email,
 //         password: password,
 //         isSignup: isSignup
 //     }
 // };
  
  export const setAuthRedirectPath = (path) => {
      return {
          type: actionTypes.SET_AUTH_REDIRECT_PATH,
          path: path
      };
  };
  
  export const authCheckState = () => {
      console.log('Checking Logout State')
      return dispatch => {
          const token = localStorage.getItem('token');
          if(!token){
              dispatch(logout());
          }else {
              const expirationDate = new Date(localStorage.getItem('expirationDate'));
              if(expirationDate <= new Date()) {
                  dispatch(logout());
            }else{
                 const userId = localStorage.getItem('userId');
                  dispatch(authSuccess(token, userId));
                  dispatch(userData(userId));
                  dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() )/ 1000));
            
              }
              
          }
      };
  };
  
//   export const authCheckState = () => {
//     console.log('Checking Logout State')
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if(!token){
//             dispatch(logout());
//         }else {
//             const expirationDate = new Date(localStorage.getItem('expirationDate'));
//             if(expirationDate > new Date()) {
//                 const userId = localStorage.getItem('userId');
//                 dispatch(authSuccess(token, userId));
//                 dispatch(userData(userId));
//                 dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() )/ 1000));
//             }else{
//                dispatch(logout());
//             }
            
//         }
//     };
// };
//  export const authCheckState = () => {
//      return {
//          type: actionTypes.AUTH_CHECK_STATE   
//      }
//  };

export const saveUserData = (first_name,last_name,phone_number,dob,email,image,address,state,city,pincode) => {
        return {
            type: actionTypes.SAVE_USER_DATA,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            dob: dob,
            email: email,
            image: image,
            address: address,
            state: state,
            city: city,
            pincode: pincode
        };
};

export const deleteUserData = () => {
    return {
        type: actionTypes.DELETE_USER_DATA,
        // first_name: first_name,
        // last_name: last_name,
        // phone_number: phone_number,
        // dob: dob,
        // email: email,
        // image: image

    }
}

export const userData = (user_id) => {
    console.log('Getting User Info');
    return dispatch => {
        console.log(user_id);
        axios.post('/fetch-user', {user_id: user_id})
        .then(res => {
            console.log(res.data);
            dispatch(saveUserData(res.data.first_name,
                res.data.last_name,
                res.data.phone_number,
                res.data.DOB,
                res.data.email,
                res.data.image,
                res.data.address,
                res.data.state,
                res.data.city,
                res.data.pincode));

        })
    }
}

export const photoStart = () => {
    return {
        type: actionTypes.PHOTO_START
    }
}

export const photoFinish = () => {
    return {
        type: actionTypes.PHOTO_FINISH
    }
}



export const photoProcess = (user_id) => {
    return dispatch => {
        dispatch(photoStart());
        dispatch(userData(user_id));
    }
}