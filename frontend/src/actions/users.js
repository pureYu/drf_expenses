import * as api from '../api'

export const addUser = (username, email, password, name, surname, groups) => {
  return (dispatch, getState) => {
    dispatch({type: "ADD_USERDATA_LOADING"});
    const key = getState().auth.key;
    const data = JSON.stringify({username, email, password, name, surname, groups});
    return api.postUser(key, data)
      .then(response => {
//        console.log('Answer: ', response);
        dispatch({
          type: 'ADD_USERDATA_SUCCESS',
          userAdded: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: 'ADD_USERDATA_FAILED',
          data: {data: error.message},
        });
      })
  }
}

export const updateUser = (id, username, email, password, name, surname, groups) => {
//  return {
//    type: 'UPDATE_USERDATA',
//    id,
//    text
//  }
  return (dispatch, getState) => {
    dispatch({type: "UPDATE_USERDATA_LOADING"});
    const key = getState().auth.key;
    const data = JSON.stringify({username, email, password, name, surname, groups});
    return api.putUser(key, id, data)
      .then(response => {   // response.status === 200
        console.log('Answer for putUser: ', response);
        dispatch({
          type: 'UPDATE_USERDATA_SUCCESS',
          userUpdated: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: 'UPDATE_USERDATA_FAILED',
          data: {data: error.message},
        });
      })
  }



}

export const deleteUser = id => {
  return (dispatch, getState) => {
    const key = getState().auth.key;
    return api.deleteUser(key, id)
      .then(response => {   // response.status === 204 ! (or 200)
//        console.log('Answer: ', response);
        dispatch({
          type: 'DELETE_USERDATA_SUCCESS',
          removedItem: id,
        });
      })
      .catch(error => {
        console.log('EEEEError: ', error);
        dispatch({
          type: 'DELETE_USERDATA_FAILED',
          data: {data: error.message},
        });
      })
  }
}

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const key = getState().auth.key;
    await api.getUsers(key)
      .then(response => {
        const userList = response.data;
        dispatch({
          type: 'FETCH_USERDATA',
          userList: userList,
        });
      })
      .catch(error => {
        let message = error.message;
        if (error.response.status === 403) {
            message = error.response.data.detail;
        }
        dispatch({
          type: 'FETCH_USERDATA_FAILED',
          data: {data: message},
        });
      })
  }
}

