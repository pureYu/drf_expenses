import React, { Component } from "react";
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {auth} from "./actions";
import expensesApp from "./reducers";

import Expenses from "./components/Expenses";
import Users from "./components/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";


let store = createStore(expensesApp, applyMiddleware(thunk));


//class App extends Component {
//
//  render() {
//    return (
//      <main className="content">
//      <Provider store={store}>
//        <BrowserRouter>
//        <Switch>
//          <Route path="/" exact component={Expenses} />
//          <Route path="/users/:id" exact component={Users} />
//          <Route path="/login" exact component={Login} />
//          <Route component={NotFound} />
//        </Switch>
//        </BrowserRouter>
//      </Provider>
//      </main>
//    );
//  }
//
//}
//export default App;

class RootContainerComponent extends Component {

  componentDidMount() {
//    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let {PrivateRoute} = this;
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Expenses} />
          <PrivateRoute exact path="/users/:id" component={Users} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
//    loadUser: () => {
//      return dispatch(auth.loadUser());
//    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}