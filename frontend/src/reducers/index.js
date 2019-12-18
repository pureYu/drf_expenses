import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import expenses from "./expenses";
import users from "./users";
import auth from "./auth";


const expensesApp = (history) => combineReducers({
  expenses, users, auth,
  router: connectRouter(history),

})

export default expensesApp;