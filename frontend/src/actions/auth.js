import * as api from '../api'

const ERR_SERVER_RESPONSE = "Unknown Error Occured. Server response not received.";


//export const loadAuthUser = () => {
//  return (dispatch, getState) => {
//    dispatch({type: "USER_LOADING"});
//    const key = getState().auth.key;
//
//    return api.getAuthUserData(key)
//      .then(res => {
//        if (res.status < 500) {
//            return {status: res.status, data: res.data};
//        } else {
//          console.log("Server Error!");
//          throw res;
//        }
//      })
//      .then(res => {
//        if (res.status === 200) {
//          dispatch({type: 'USER_LOADED', user: res.data });
//          return res.data;
//        } else if (res.status >= 400 && res.status < 500) {
//          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
//          throw res.data;
//        }
//      })
//  }
//}

export const loadAuthUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});
    const key = getState().auth.key;

    return api.getAuthUserData(key)

      .then(response => {
        if (response.status === 200) {
          dispatch({type: 'USER_LOADED', user: response.data });
        } else {
          dispatch({type: "AUTHENTICATION_ERROR", data: response.data});
        }
        return response.data;
      })
      .catch((error) => {
          dispatch({type: "AUTHENTICATION_ERROR", data: {data: error.message}});
          throw error.message;
      });
  }
}

//export const login = (username, password) => {
//  return (dispatch, getState) => {
//    return api.postLogin(username, password)
//      .then(res => {
//        if (res.status < 500) {
//            return {status: res.status, data: res.data};
//        } else {
//          console.log("Server Error!");
//          throw res;
//        }
//      })
//      .then(res => {
//        if (res.status === 200) {
//          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
//          return res.data;
//        } else if (res.status === 403 || res.status === 401) {
//          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
//          throw res.data;
//        } else {
//          dispatch({type: "LOGIN_FAILED", data: res.data});
//          throw res.data;
//        }
//      })
//  }
//}

export const login = (username, password) => {
  return (dispatch, getState) => {
    return api.postLogin(username, password)

      .then(response => {
        if (response.status === 200) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data: response.data });
        } else {
          dispatch({type: "LOGIN_FAILED", data: response.data});
        }
        return response.data;
      })
      .catch((error) => {
          // Error
          if (error.response) {
              let data = typeof error.response.data == 'string' ? {data: error.message} : error.response.data;
              // The server responded with a status code that falls out of the range of 2xx
               if (error.response.headers === 401 || error.response.headers === 403) {
                 dispatch({type: "AUTHENTICATION_ERROR", data: data});
               } else {
                 dispatch({type: "LOGIN_FAILED", data: data});
               }
          } else if (error.request) {
              // The request was made but no response was received
              let data = {data: ERR_SERVER_RESPONSE};
              dispatch({type: "LOGIN_FAILED", data});
          } else {
              // Something happened in setting up the request that triggered an Error
              let data = {data: error.message};
              dispatch({type: "LOGIN_FAILED", data});
          }
      });
  }
}


//
//export const register = (username, password1, password2, email, name, surname) => {
//  return (dispatch, getState) => {
//    const data = JSON.stringify({username, password1, password2, email, name, surname});
//    return api.postRegister(data)
//      .then(res => {
//        if (res.status < 500) {
//          return {status: res.status, data: res.data};
//        } else {
//          console.log("Server Error!");
//          throw res;
//        }
//      })
//      .then(res => {
//        if (res.status === 200 || res.status === 201) {
//          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
//          return res.data;
//        } else if (res.status === 403 || res.status === 401) {
//          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
//          throw res.data;
//        } else {
//          dispatch({type: "REGISTRATION_FAILED", data: res.data});
//          throw res.data;
//        }
//      })
//  }
//}

export const register = (username, password1, password2, email, name, surname) => {
  return (dispatch, getState) => {
    const data = JSON.stringify({username, password1, password2, email, name, surname});
    return api.postRegister(data)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: response.data });
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: response.data});
        }
        return response.data;
      })
      .catch((error) => {
          // Error
          if (error.response) {
              let data = typeof error.response.data == 'string' ? {data: error.message} : error.response.data;
              // The server responded with a status code that falls out of the range of 2xx
               if (error.response.headers === 401 || error.response.headers === 403) {
                 dispatch({type: "AUTHENTICATION_ERROR", data});
               } else {
                 dispatch({type: "REGISTRATION_FAILED", data});
               }
          } else if (error.request) {
              // The request was made but no response was received
              let data = {data: ERR_SERVER_RESPONSE};
              dispatch({type: "REGISTRATION_FAILED", data});
          } else {
              // Something happened in setting up the request that triggered an Error
              let data = {data: error.message};
              dispatch({type: "REGISTRATION_FAILED", data});
          }
      });
  }
}

//export const logout = () => {
//  return (dispatch, getState) => {
//    return api.postLogout()
//      .then(res => {
//        if (res.status < 500) {
//          return {status: res.status, data: res.data};
//        } else {
//          console.log("Server Error!");
//          throw res;
//        }
//      })
//      .then(res => {
//        if (res.status === 200) {
//          dispatch({type: 'LOGOUT_SUCCESSFUL', data: res.data });
//          return res.data;
//        } else {
//          dispatch({type: "LOGOUT_FAILED", data: res.data});
//          throw res.data;
//        }
//      })
//  }
//}

export const logout = () => {
  return (dispatch, getState) => {
    return api.postLogout()
      .then(response => {
        if (response.status === 200) {
          dispatch({type: 'LOGOUT_SUCCESSFUL', data: response.data });
        } else {
          dispatch({type: "LOGOUT_FAILED", data: response.data});
        }
        return response.data;
      })
      .catch((error) => {
          dispatch({type: "LOGOUT_FAILED", data: error.message});
          throw error.message;
      });
  }
}
