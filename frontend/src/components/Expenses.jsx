import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from "./Modal";
import AuthUser from "./AuthUser";

import {expenses} from '../actions'


// export default class Expenses extends Component {
class Expenses extends Component {

  async componentDidMount() {
    this.props.fetchExpenses();
//     try {
// //       this.props.fetchExpenses();
//       const res = await fetch('http://127.0.0.1:8000/api/expenses/'); // fetching the data from api, before the page loaded
//       const expenses = await res.json();
//       this.setState({
//         expenseList: expenses,
//       });
//     } catch (e) {
//       console.log(e);
//     }
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        amount: "",
        date_spent: "",
      },
      expenseList: []
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.props.addExpense(item.title, item.amount, item.date_spent);
    this.toggle();
//     alert("save" + JSON.stringify(item));
  };
  handleDelete = item => {
    alert("delete" + JSON.stringify(item));
//     this.props.deleteExpense(item.id);
    alert("deleted " + item.id);
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
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
   }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.expenses.errors) {
    errors = Object.keys(state.expenses.errors).map(field => {
      return {field, message: state.expenses.errors[field]};
    });
  }
  return {
    errors,
    expenseList: state.expenses.expenseList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchExpenses: () => {
      dispatch(expenses.fetchExpenses());
    },
    addExpense: (text, amount, date_spent) => {
      dispatch(expenses.addExpense(text, amount, date_spent));
    },
    updateExpense: (id, text) => {
      dispatch(expenses.addExpense(id, text));
    },
    deleteExpense: (id) => {
      dispatch(expenses.deleteExpense(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
