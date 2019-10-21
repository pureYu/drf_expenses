import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";


class Login extends Component {

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    let errorPanel = '';
    if (this.props.errors.length > 0) {
      errorPanel =
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{this.state && this.state.hasOwnProperty(error.field) ? <span>{error.field}: </span> : ""} {error.message}</li>
              ))}
            </ul>
    }

    return (
  <div>
    <h1 className="text-white text-uppercase text-center my-4">Login</h1>
    <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">

      <form onSubmit={this.onSubmit}>
        <fieldset>

          {errorPanel}

          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username" required={true}
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <button type="submit">Login</button>
          </p>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </fieldset>
      </form>

            </div>
        </div>
    </div>
  </div>

    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
