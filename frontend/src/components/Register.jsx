import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";


class Login extends Component {

  state = {
    name: "",
    surname: "",
    username: "",
    password1: "",
    password2: "",
    email: "",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.username, this.state.password1, this.state.password2, this.state.email, this.state.name, this.state.surname);
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
    <h1 className="text-white text-uppercase text-center my-4">Register</h1>
    <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">

      <form onSubmit={this.onSubmit}>
        <fieldset>

          {errorPanel}

          <p>
            <label htmlFor="name">Your name</label>
            <input
              type="text" id="name" required={true}
              onChange={e => this.setState({name: e.target.value})} />
          </p>
          <p>
            <label htmlFor="surname">Your surname</label>
            <input
              type="text" id="surname" required={true}
              onChange={e => this.setState({surname: e.target.value})} />
          </p>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username" required={true}
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password1">Password</label>
            <input
              type="password" id="password1" required={true}
              onChange={e => this.setState({password1: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password2">Repeat password</label>
            <input
              type="password" id="password2" required={true}
              onChange={e => this.setState({password2: e.target.value})} />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email" required={true}
              onChange={e => this.setState({email: e.target.value})} />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/login">Login</Link>
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
    register: (username, password1, password2, email, name, surname) => dispatch(auth.register(username, password1, password2, email, name, surname)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);