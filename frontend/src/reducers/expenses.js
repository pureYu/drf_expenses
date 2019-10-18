const initialState = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        amount: "",
        completed: false
      },
      expenseList: []
    };


export default function expenses(state=initialState, action) {

  switch (action.type) {

    case 'ADD_EXPENSE':
//      return [...state, {text: action.text}];
      return {...state};

    case 'UPDATE_EXPENSE':
//      let expenseToUpdate = expenseList[action.id]
//      expenseToUpdate.text = action.text;
//      expenseList.splice(action.id, 1, expenseToUpdate);
//      return expenseList;
      return {...state};

    case 'DELETE_EXPENSE':
//      expenseList.splice(action.id, 1);
//      return expenseList;
      return {...state};

    case 'FETCH_EXPENSES':
      return  {...state, expenseList: action.expenseList};

    case 'FETCH_EXPENSES_FAILED':
      return  {...state, errors: action.data};

    default:
      return state;
  }
}