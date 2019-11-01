import React, { Component } from 'react';
import {connect} from 'react-redux';
import Modal from "./Modal";
import FormExpense from "./FormExpense";
import AuthUser from "./AuthUser";

import {expenses} from '../actions'


// export default class Expenses extends Component {
class Expenses extends Component {

  async componentDidMount() {
    this.props.fetchExpenses();
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        id: "",
        title: "",
        amount: "",
        date_spent: "",
      },
      expenseList: [],
      removedItem: "",
      expenseAdded: "",
      expenseUpdated: "",
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    if (!item.id) {
      console.log('add');
      this.props.addExpense(item);
    } else {
      console.log('edit');
      this.props.updateExpense(item.id, item);
    }
    this.toggle();
    console.log(this.props.errors);
  };
  handleDelete = item => {
    this.props.deleteExpense(item.id);
//     console.log(this.props.errors);
  };
  createItem = () => {
    const item = { title: "", amount: "", date_spent: ""};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
//    const newItems = this.state.expenseList.filter(
//      item => item.completed === viewCompleted
//    );
    const newItems = this.props.expenseList;
//     const newItems = this.state.expenseList;
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`expense-title mr-2 ${
            this.state.viewCompleted ? "completed-expense" : ""
          }`}
          title={item.title}
        >
          <span className={`expense-id`}>{item.id}</span>
          <span>{item.title}</span>
          <span className={`expense-date_spent`} date_spent={item.date_spent}>{item.date_spent}</span>
          <span className={`expense-amount`} amount={item.amount}>{item.amount}</span>
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <div>
        <h1 className="text-white text-uppercase text-center my-4">Expense Tracking App</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                  <div className="float-left">
                    <button onClick={this.createItem} className="btn btn-primary">
                      Add expense item
                    </button>
                  </div>
                  <AuthUser />
              </div>
              {this.renderTabList()}

              {this.props.errors.length > 0 && (
                <ul>
                  {this.props.errors.map(error => (
                    <li key={error.field}>{error.message}</li>
                  ))}
                </ul>
              )}

              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            toggle={this.toggle}
            onSave={this.handleSubmit}
            mTitle="Expense Item"
          >
            <FormExpense
              activeItem={this.state.activeItem}
              onSave={this.handleSubmit}
            />
          </Modal>
        ) : null}
      </div>
    );
   }
}

const mapStateToProps = state => {
//   console.log('in mapDispatchToProps')
//   console.log(state.expenses);

  let errors = [];
  if (state.expenses.errors) {
    errors = Object.keys(state.expenses.errors).map(field => {
      return {field, message: state.expenses.errors[field]};
    });
  }
  return {
    errors,
    expenseList: state.expenses.expenseList,
    removedItem: state.expenses.removedItem,
    expenseAdded: state.expenses.expenseAdded,
    expenseUpdated: state.expenses.expenseUpdated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchExpenses: () => {
      dispatch(expenses.fetchExpenses());
    },
    addExpense: (item) => {
      dispatch(expenses.addExpense(item.title, item.amount, item.date_spent));
    },
    updateExpense: (id, item) => {
      dispatch(expenses.updateExpense(id, item.title, item.amount, item.date_spent));
    },
    deleteExpense: (id) => {
      dispatch(expenses.deleteExpense(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
