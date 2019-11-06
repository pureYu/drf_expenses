import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import {FormErrors} from "./FormError";


export default class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      formErrors: {username: '', email: '', password: '', password2: '', name: '', surname: ''},
      formValid: { valid: false,
          username: false, email: false, password: false, password2: false, name: false, surname: false
      },
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem },
                  () => { this.validateField(name, value) });
  };

//https://learnetto.com/blog/react-form-validation
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let formValid = this.state.formValid;

    switch(fieldName) {
      case 'email':
        formValid.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = formValid.email ? '' : ' is invalid';
        break;
      case 'password':
        formValid.password = value.length >= 6;
        fieldValidationErrors.password = formValid.password ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    formValid: formValid,
                  }, this.validateForm);
  }

  validateForm() {
    let formValid = this.state.formValid;
    formValid.valid = formValid.username && formValid.email && formValid.password && formValid.password2
                         && formValid.name && formValid.surname ;
    this.setState({formValid: formValid});
  }

  validateAll = e => {
    console.log('e', e);
    console.log('this.state.formValid.valid', this.state.formValid.valid);
    console.log('this.state.formValid', this.state.formValid);
//    const controls = document.forms["user-data"].controls;
//    console.log('controls', controls);
    alert('validate all');

    return false;
    // foreach field - validateField()
    if (this.state.formValid.valid) {
      const { onSave } = this.props;
      onSave(this.state.activeItem);
    }
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    const { onSave } = this.props;
    return (
        <div>
          <div className="panel panel-default">
           <FormErrors formErrors={this.state.formErrors} />
          </div>
          <Form name="user-data">
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
                type="text"
                name="password"
                value={this.state.activeItem.password}
                onChange={this.handleChange}
                required={true}
              />
            </FormGroup>
            <FormGroup className={`form-group
                 ${this.errorClass(this.state.formErrors.password2)}`}>
              <Label for="password2">Repeat Password</Label>
              <Input
                type="text"
                name="password2"
                value=""
                onChange={this.handleChange}
                required={true}
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