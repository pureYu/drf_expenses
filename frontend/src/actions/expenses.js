import * as api from '../api'

export const addExpense = (title, amount, date_spent) => {
  return (dispatch, getState) => {
    dispatch({type: "ADD_EXPENSE_LOADING"});
    const key = getState().auth.key;
    const data = JSON.stringify({title, amount, date_spent});
    console.log('Posting date_spent: ', date_spent);
    console.log('Posting data: ', data);

    return api.postExpense(key, data)
      .then(response => {
        console.log('Answer: ', data);
//        const expenseList = response.data;
        dispatch({
          type: 'ADD_EXPENSE',   // reload expenses here
//          expenseList: expenseList,
        });
      })
      .catch(err => {
        dispatch({
          type: 'ADD_EXPENSE_FAILED',
          data: err.data,
        });
      })
  }
}

export const updateExpense = (id, text) => {
  return {
    type: 'UPDATE_EXPENSE',
    id,
    text
  }
}

export const deleteExpense = id => {
  return {
    type: 'DELETE_EXPENSE',
    id
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
      .catch(err => {
        dispatch({
          type: 'FETCH_EXPENSES_FAILED',
          data: err.data,
        });
      })
  }
}

