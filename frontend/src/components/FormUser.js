import React, { Component } from "react";
import {connect} from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import {FormErrors} from "./FormError";


//export default class FormUser extends Component {
class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      formErrors: {username: '', email: '', password: '', password2: '', name: '', surname: ''},
      formValid: { valid: false,
          username: false, email: false, password: false, password2: false, name: false, surname: false
      },
      showFormErrors: false,
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
    this.validateField(name, value);
  };

  validateField(fieldName, value) {
    let {formErrors, formValid, activeItem} = this.state
    value = (typeof value === 'undefined') ? '' : value;
    activeItem.password = (typeof activeItem.password === 'undefined') ? '' : activeItem.password
    switch(fieldName) {
      case 'email':
        formValid.email = !!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = formValid.email ? '' : ' is invalid';
        break;
      case 'password':
        formValid.password = (activeItem.id && value === '') ? true : value.length >= 6;
        formErrors.password = formValid.password ? '': ' is too short';
        break;
      case 'password2':
        formValid.password2 = value === activeItem.password;
        formErrors.password2 = formValid.password2 ? '': ' is not match';
        break;
      case 'username':
      case 'name':
      case 'surname':
        formValid[fieldName] = !!value.match(/^([\w.+-]+)$/i);
        formErrors[fieldName] = formValid[fieldName] ? '' : ' is invalid';
        break;
    }
    this.setState({formErrors: formErrors,
                    formValid: formValid,
                  }, this.validateForm);
  }

  validateForm() {
    let { formValid } = this.state;
    formValid.valid = formValid.username && formValid.email && formValid.password && formValid.password2
                         && formValid.name && formValid.surname ;
    this.setState({ formValid });
  }

  validateAll = e => {
    let { formValid, activeItem } = this.state;
    for (var key in formValid) {
      if (key !== 'valid') {
        this.validateField(key, activeItem[key]);
      }
    }
    console.log('this.state.formValid.valid', this.state.formValid.valid);
    console.log('this.state.formValid', this.state.formValid);
    console.log('this.state.formErrors', this.state.formErrors);
    console.log('this.state.activeItem', this.state.activeItem);
    console.log('this.props.errors', this.props.errors);
    if (!this.state.formValid.valid) {
      this.setState({ showFormErrors: true });
    } else {

//      return false;
      const { onSave } = this.props;
      onSave(this.state.activeItem);
    }
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    const { onSave, errors } = this.props;
    console.log('in form-render errors: ', errors);
    console.log('in form-render this.props: ', this.props);
    console.log('in form-render this.state.showFormErrors: ', this.state.showFormErrors);
    return (
        <div>
        {this.state.showFormErrors ? (
          <div className="panel panel-default">
           <FormErrors formErrors={this.state.formErrors} resultErrors={errors} />
          </div>
        ) : null}
          <Form name="user-data" noValidate>
            <FormGroup className={`form-group
                 ${this.errorClass(this.state.formErrors.username)}`}>
              <Label for="username">Username</Label>
              <Input type="hidden" name="id" value={this.state.activeItem.id} />
              <Input
                type="text"
                name="username"
                value={this.state.activeItem.username}
                onChange={this.handleChange}
                required={true}
              />
            </FormGroup>
            <FormGroup className={`form-group
                 ${this.errorClass(this.state.formErrors.email)}`}>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                required={true}
              />
            </FormGroup>
            <FormGroup className={`form-group
                 ${this.errorClass(this.state.formErrors.password)}`}>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                required={this.state.activeItem.id ? true : false}
              />
            </FormGroup>
            <FormGroup className={`form-group
                 ${this.errorClass(this.state.formErrors.password2)}`}>
              <Label for="password2">Repeat Password</Label>
              <Input
                type="password"
                name="password2"
                onChange={this.handleChange}
                required={this.state.activeItem.id ? true : false}
              />
            </FormGroup>
            <FormGroup className={`form-group
                 ${this.errorClass(this.state.formErrors.name)}`}>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                required={true}
              />
            </FormGroup>
            <FormGroup className={`form-group
                 ${this.errorClass(this.state.formErrors.surname)}`}>
              <Label for="surname">Surname</Label>
              <Input
                type="text"
                name="surname"
                value={this.state.activeItem.surname}
                onChange={this.handleChange}
                required={true}
              />
            </FormGroup>
          </Form>
          <div className="modal-footer">
            {/*
            <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            */}
            <Button color="success" onClick={this.validateAll}>
              Save
            </Button>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
   console.log('in FormUser mapDispatchToProps')
   console.log('state.users.errors:', state.users.errors);
   if (typeof state.users.errors !== 'undefined') {
     console.log('Object.keys(state.users.errors):', Object.keys(state.users.errors));
   }

  let errors = [];
  if (state.users.errors) {
//    errors = Object.keys(state.users.errors).map(field => {
//      return {field, message: state.users.errors[field]};
//    });
    Object.keys(state.users.errors).map((field) => {
      console.log('^^^^^ typeof value: ', typeof state.users.errors[field]);
      console.log(state.users.errors[field]);
      if (typeof state.users.errors[field] === "object") {
        Object.keys(state.users.errors[field]).map((f) => {
          errors.push({field: f, message: state.users.errors[field][f]});
        })
      } else {
        errors.push({field, message: state.users.errors[field]});
      }
    });
  }
  return {
    errors,
  }
}

//const mapDispatchToProps = dispatch => {
//  return {
//    fetchUsers: () => {
//      dispatch(users.fetchUsers());
//    },
//    addUser: (item) => {
//      dispatch(users.addUser(item.username, item.email, item.password, item.name, item.surname, item.groups));
//    },
//    updateUser: (id, item) => {
//      dispatch(users.updateUser(id, item.username, item.email, item.password, item.name, item.surname, item.groups));
//    },
//    deleteUser: (id) => {
//      dispatch(users.deleteUser(id));
//    },
//  }
//}
//
//export default connect(mapStateToProps, mapDispatchToProps)(FormUser);
export default connect(mapStateToProps)(FormUser);
