import * as api from '../api'

export const addExpense = text => {
  return {
    type: 'ADD_EXPENSE',
    text
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
