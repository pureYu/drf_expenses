import React, { Component } from "react";
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ConnectedRouter, routerMiddleware, push } from 'connected-react-router';
import { createBrowserHistory } from 'history';

//import {auth} from "./actions";
import expensesApp from "./reducers";

import Expenses from "./components/Expenses";
import Users from "./components/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";


const history = createBrowserHistory()

let store = createStore(expensesApp(history), applyMiddleware(routerMiddleware(history), thunk));


class RootContainerComponent extends Component {

  componentDidMount() {
//    this.props.loadAuthUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      console.log(this.props.auth.user);
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      }
      if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      }

      /*if (this.props.auth.user && this.props.auth.user.groups) {
        const user_groups = this.props.auth.user.groups;
        for (let i=0; i<user_groups.length; i++) {
          console.log(user_groups[i]);
          if (!user_groups[i].hasOwnProperty("name"))
            continue;
          console.log("this.props.pathname.replace(/^\/+|\/+$/g, '')", this.props.pathname.replace(/^\/+|\/+$/g, ''))
          console.log("this.props.pathname.replace(/^\/+|\/+$/g, '') !== 'users' ", this.props.pathname.replace(/^\/+|\/+$/g, '') !== 'users')
          if (user_groups[i]["name"] === "user_manager" && this.props.pathname.replace(/^\/+|\/+$/g, '') !== 'users') {
            console.log('user manager!!!!!!!!!!');
//            dispatch(push('/users/'))
//            this.props.push('/users/');
//            return <Redirect to="/users/" />;
//            return <Redirect exact from="/" to="/users/" component={Users} />
//            ChildComponent = Users;
            return <Users exact path="/users/" name='users_area' />
          } else if (user_groups[i].hasOwnProperty("name") && user_groups[i]["name"] === "regular_user") {
            console.log('regular user!!!!!!!!!!');
            return <Expenses exact path="/" name='expenses_area' />
          } else if (user_groups[i].hasOwnProperty("name") && user_groups[i]["name"] === "admin") {
            console.log('admin!!!!!!!!!!');
          }
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', this.props.pathname);
          // TODO : redirect user_manager to his page
        }
      }*/

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
    return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Expenses} name='expenses_area'/>
          <PrivateRoute exact path="/users" component={Users} name='users_area' />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    pathname: state.router.location.pathname,
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