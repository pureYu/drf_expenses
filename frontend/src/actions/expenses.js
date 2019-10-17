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
//export const fetchExpenses = () => {
//  return async (dispatch, getState) => {
//    const key = getState().auth.key;
//    const expenseList = await api.getExpenses(key);
//
//    return dispatch({
//          type: 'FETCH_EXPENSES',
//          expenseList: expenseList,
//        })
//  }
//}
//export const fetchExpenses = () => {
//  return (dispatch, getState) => {
//    console.log('store',  getState());
//    const key = getState().auth.key;
//    console.log('key: ',  key);
//    let headers = {"Content-Type": "application/json"};
//    headers["Authorization"] = `Token ${key}`;
//    return fetch('http://127.0.0.1:8000/api/expenses/', {headers, })
//      .then(res => res.json())
//      .then(expenses => {
//
//        return dispatch({
//          type: 'FETCH_EXPENSES',
//          expenseList: expenses,
//        })
//      })
//  }
//}

