import React, { Component } from 'react';
import {connect} from 'react-redux';
import Modal from "./Modal";
import FormUser from "./FormUser";
import AuthUser from "./AuthUser";

import {users} from '../actions'


class Users extends Component {

  async componentDidMount() {
    this.props.fetchUsers();
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        id: "",
        username: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        groups: "",
      },
      userList: [],
      removedItem: "",
      userAdded: "",
      userUpdated: "",
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    if (!item.id) {
      console.log('add');
      this.props.addUser(item);
    } else {
      console.log('edit');
      this.props.updateUser(item.id, item);
    }
    this.toggle();
    console.log(this.props.errors);
  };
  handleDelete = item => {
    this.props.deleteUser(item.id);
//     console.log(this.props.errors);
  };
  createItem = () => {
    const item = { username: "", email: "", password: "", name: "", surname: "", groups: ""};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const userItems = this.props.userList;
    return userItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`expense-title`} title={item.username}>
          <span className={`user-id`}>{item.id}</span>
          <span>{item.username} ({item.email})</span>
          <span className={`user-groups`}>
            {item.groups.map(function(d, idx){
              return (<span key='group'>{d.name}</span>)
            })}
          </span>
          <span className={`users-longname`}>{item.name} {item.surname}</span>
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
        <h1 className="text-white text-uppercase text-center my-4">Expense Tracking App - Users</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                  <div className="float-left">
                    <button onClick={this.createItem} className="btn btn-primary">
                      Add user
                    </button>
                  </div>
                  <AuthUser />
              </div>
              <div className="my-5 tab-list">
              </div>

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
            mTitle="User Data"
          >
            <FormUser
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
//   console.log(state.users);

  let errors = [];
  if (state.users.errors) {
    errors = Object.keys(state.users.errors).map(field => {
      return {field, message: state.users.errors[field]};
    });
  }
  return {
    errors,
    userList: state.users.userList,
    removedItem: state.users.removedItem,
    userAdded: state.users.userAdded,
    userUpdated: state.users.userUpdated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(users.fetchUsers());
    },
    addUser: (item) => {
      dispatch(users.addUser(item.username, item.email, item.password, item.name, item.surname, item.groups));
    },
    updateUser: (id, item) => {
      dispatch(users.updateUser(id, item.username, item.email, item.password, item.name, item.surname, item.groups));
    },
    deleteUser: (id) => {
      dispatch(users.deleteUser(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
