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
      state.expenseList.unshift(action.expenseAdded);
      return {...state, expenseAdded: action.expenseAdded, expenseList: state.expenseList};

    case 'UPDATE_EXPENSE_SUCCESS':
      let expenseToUpdateIdx = state.expenseList.findIndex(x => x.id === action.expenseUpdated.id)
      state.expenseList[expenseToUpdateIdx] = action.expenseUpdated;
      return {...state, expenseUpdated: action.expenseUpdated, expenseList: state.expenseList};

    case 'DELETE_EXPENSE_SUCCESS':
      let expenseListFiltered = state.expenseList.filter(exp => exp.id !== action.removedItem);
      return {...state, removedItem: action.removedItem, expenseList: expenseListFiltered };

    case 'FETCH_EXPENSES':
      return  {...state, expenseList: action.expenseList};

    case 'ADD_EXPENSE_FAILED':
    case 'UPDATE_EXPENSE_FAILED':
    case 'DELETE_EXPENSE_FAILED':
    case 'FETCH_EXPENSES_FAILED':
      return  {...state, errors: action.data};

    default:
      return state;
  }
}