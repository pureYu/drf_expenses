import { combineReducers } from 'redux';
import expenses from "./expenses";
import auth from "./auth";


const expensesApp = combineReducers({
  expenses, auth,
})

export default expensesApp;