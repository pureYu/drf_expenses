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
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
//    return fetch("/api/expenses/", {headers, })
    return fetch('http://127.0.0.1:8000/api/expenses/', {headers, })
      .then(res => res.json())
      .then(expenses => {
        console.log('success');
        console.log(expenses);


        return dispatch({
          type: 'FETCH_EXPENSES',
          expenses
        })
      })
  }
}