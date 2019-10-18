import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
//import DatePicker from "react-datepicker";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      formErrors: {title: '', amount: '', date_spent: ''},
      formValid: { valid: false,
        titleValid: false,
        amountValid: false,
        dateValid: false,
      },
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  handleChangeDateTime = e => {
    let name = 'date_spent', value = e.toString();
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

//https://learnetto.com/blog/react-form-validation
//  validateField(fieldName, value) {
//    let fieldValidationErrors = this.state.formErrors;
//    let titleValid = this.state.formValid.titleValid;
//    let passwordValid = this.state.formValid.passwordValid;
//
//    switch(fieldName) {
//      case 'email':
//        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
//        break;
//      case 'password':
//        passwordValid = value.length >= 6;
//        fieldValidationErrors.password = passwordValid ? '': ' is too short';
//        break;
//      default:
//        break;
//    }
//    this.setState({formErrors: fieldValidationErrors,
//                    emailValid: emailValid,
//                    passwordValid: passwordValid
//                  }, this.validateForm);
//  }
//
//  validateForm() {
//    let formValid = this.state.formValid;
//    formValid.valid = formValid.titleValid && formValid.amountValid && formValid.dateValid;
//    this.setState({formValid: formValid});
//  }


  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Expense Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Expense Title"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="text"
                name="amount"
                value={this.state.activeItem.amount}
                onChange={this.handleChange}
                placeholder="Enter The Sum"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="date_spent">Date spent</Label>
              <DatePicker
                selected={this.state.activeItem.date_spent ? new Date(this.state.activeItem.date_spent) : ""}
                onChange={this.handleChangeDateTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                locale="uk"
                dateFormat="yyyy-MM-dd HH:mm"
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}