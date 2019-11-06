import { combineReducers } from 'redux';
import expenses from "./expenses";
import users from "./users";
import auth from "./auth";


const expensesApp = combineReducers({
  expenses, users, auth,
})

export default expensesApp;