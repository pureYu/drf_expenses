import React, { Component } from "react";
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//import {auth} from "./actions";
import expensesApp from "./reducers";

import Expenses from "./components/Expenses";
import Users from "./components/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";


let store = createStore(expensesApp, applyMiddleware(thunk));


class RootContainerComponent extends Component {

  componentDidMount() {
//    this.props.loadAuthUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      }
      if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      }

      return <ChildComponent {...props} />

    }} />
  }

//  DecisionRoute = ({ trueComponent, falseComponent, decisionFunc, ...rest }) => {
//    return (
//      <Route {...rest} render={
//          decisionFunc()
//            ? trueComponent
//            : falseComponent
//        }
//      />
//    )
//  }
//
  render() {
    let {PrivateRoute} = this;

//    let user_groups = [];
//    if (this.props.auth.user && this.props.auth.user.groups) {
//      user_groups = this.props.auth.user.groups;
//    }
//    console.log('USER GROUPS: ', user_groups);
//    if (user_groups.some(e => e.name === 'user_manager')) {
//        return <Redirect exact from="/" to="/users" />;
//    }
//
//          <PrivateRoute exact path="/" render={() => (
//            user_groups.some(e => e.name === 'user_manager') ? (
//              <Redirect exact from="/" to="/users" component={Users} />
//            ) : (
//              <Expenses />
//            )
//          )}/>



    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Expenses} />
          <PrivateRoute exact path="/users" component={Users} />
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
//    loadAuthUser: () => {
//      return dispatch(auth.loadAuthUser());
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