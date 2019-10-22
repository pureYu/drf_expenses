import * as api from '../api'

export const addExpense = (title, amount, date_spent) => {
  return (dispatch, getState) => {
    dispatch({type: "ADD_EXPENSE_LOADING"});
    const key = getState().auth.key;
    const data = JSON.stringify({title, amount, date_spent});
    return api.postExpense(key, data)
      .then(response => {
//        console.log('Answer: ', response);
        dispatch({
          type: 'ADD_EXPENSE_SUCCESS',
          expenseAdded: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: 'ADD_EXPENSE_FAILED',
          data: {data: error.message},
        });
      })
  }
}

export const updateExpense = (id, title, amount, date_spent) => {
//  return {
//    type: 'UPDATE_EXPENSE',
//    id,
//    text
//  }
  return (dispatch, getState) => {
    dispatch({type: "UPDATE_EXPENSE_LOADING"});
    const key = getState().auth.key;
    const data = JSON.stringify({title, amount, date_spent});
    return api.putExpense(key, id, data)
      .then(response => {   // response.status === 200
        console.log('Answer for putExpense: ', response);
        dispatch({
          type: 'UPDATE_EXPENSE_SUCCESS',
          expenseUpdated: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: 'UPDATE_EXPENSE_FAILED',
          data: {data: error.message},
        });
      })
  }



}

export const deleteExpense = id => {
  return (dispatch, getState) => {
    const key = getState().auth.key;
    return api.deleteExpense(key, id)
      .then(response => {   // response.status === 204 ! (or 200)
//        console.log('Answer: ', response);
        dispatch({
          type: 'DELETE_EXPENSE_SUCCESS',
          removedItem: id,
        });
      })
      .catch(error => {
        console.log('EEEEError: ', error);
        dispatch({
          type: 'DELETE_EXPENSE_FAILED',
          data: {data: error.message},
        });
      })
  }
}

export const fetchExpenses = () => {
  return async (dispatch, getState) => {
    const key = getState().auth.key;
    await api.getExpenses(key)
      .then(response => {
        const expenseList = response.data;
        dispatch({
          type: 'FETCH_EXPENSES',
          expenseList: expenseList,
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_EXPENSES_FAILED',
          data: {data: error.message},
        });
      })
  }
}

