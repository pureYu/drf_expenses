const initialState = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        username: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        groups: "",
      },
      userList: [],
      removedItem: "",
    };


export default function users(state=initialState, action) {

  switch (action.type) {

    case 'ADD_USERDATA_SUCCESS':
      state.userList.unshift(action.userAdded);
      return {...state, userAdded: action.userAdded, userList: state.userList};

    case 'UPDATE_USERDATA_SUCCESS':
      let userToUpdateIdx = state.userList.findIndex(x => x.id === action.userUpdated.id)
      state.userList[userToUpdateIdx] = action.userUpdated;
      return {...state, userUpdated: action.userUpdated, userList: state.userList};

    case 'DELETE_USERDATA_SUCCESS':
      let userListFiltered = state.userList.filter(usr => usr.id !== action.removedItem);
      return {...state, removedItem: action.removedItem, userList: userListFiltered };

    case 'FETCH_USERDATA':
      return  {...state, userList: action.userList};

    case 'ADD_USERDATA_FAILED':
    case 'UPDATE_USERDATA_FAILED':
    case 'DELETE_USERDATA_FAILED':
    case 'FETCH_USERDATA_FAILED':
      return  {...state, errors: action.data};

    default:
      return state;
  }
}