const initialState = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        amount: "",
        completed: false
      },
      expenseList: [],
      removedItem: "",
    };


export default function expenses(state=initialState, action) {

  switch (action.type) {

    case 'ADD_EXPENSE_SUCCESS':
//      console.log('in ADD_EXPENSE_SUCCESS:');
//      console.log('state.expenseList: ', state.expenseList);
      state.expenseList.unshift(action.expenseAdded);
//      console.log('state.expenseList: ', state.expenseList);
      return {...state, expenseAdded: action.expenseAdded, expenseList: state.expenseList};

    case 'UPDATE_EXPENSE':
//      let expenseToUpdate = expenseList[action.id]
//      expenseToUpdate.text = action.text;
//      expenseList.splice(action.id, 1, expenseToUpdate);
//      return expenseList;
      return {...state};

    case 'DELETE_EXPENSE_SUCCESS':
      let expenseListFiltered = state.expenseList.filter(exp => exp.id !== action.removedItem);
      return {...state, removedItem: action.removedItem, expenseList: expenseListFiltered };

    case 'FETCH_EXPENSES':
      return  {...state, expenseList: action.expenseList};

    case 'DELETE_EXPENSE_FAILED':
    case 'FETCH_EXPENSES_FAILED':
      return  {...state, errors: action.data};

    default:
      return state;
  }
}