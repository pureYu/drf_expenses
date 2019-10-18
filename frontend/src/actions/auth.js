import * as api from '../api'


export const loadAuthUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});
    const key = getState().auth.key;

    return api.getAuthUserData(key)
      .then(res => {
        if (res.status < 500) {
            return {status: res.status, data: res.data};
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'USER_LOADED', user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const login = (username, password) => {
  return (dispatch, getState) => {
    return api.postLogin(username, password)
      .then(res => {
        if (res.status < 500) {
            return {status: res.status, data: res.data};
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

export const register = (username, password1, password2, email, name, surname) => {
  return (dispatch, getState) => {
    return api.postRegister(username, password1, password2, email, name, surname)
      .then(res => {
        if (res.status < 500) {
          return {status: res.status, data: res.data};
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    return api.postLogout()
      .then(res => {
        if (res.status < 500) {
          return {status: res.status, data: res.data};
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'LOGOUT_SUCCESSFUL', data: res.data });
          return res.data;
        } else {
          dispatch({type: "LOGOUT_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}
