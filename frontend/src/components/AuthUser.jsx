import React, {Component} from "react";
import {connect} from "react-redux";

import {auth} from "../actions";


class AuthUser extends Component {

  componentDidMount() {
    if (!this.props.auth.user) {
      this.props.loadUser();
    }
    console.log('this.props.auth: ', this.props.auth);
    console.log('this.props.auth.user: ', this.props.auth.user);
  }

  doLogout = () => {
    this.props.logout();
  };

  render() {
    if (!this.props.auth.isAuthenticated) {
      return ''
    }

    let userInfo;
    if (this.props.auth.user) {
      const { pk, username, email } = this.props.auth.user;
        userInfo =  <span>Hello, {username}! (#{pk}, {email}) </span>
    }

    return (
      <div className="float-right">
        {userInfo}

        <button onClick={this.doLogout} className="btn btn-primary">
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(auth.logout());
    },
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthUser);
