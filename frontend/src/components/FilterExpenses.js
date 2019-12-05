import React, { Component } from 'react'

class filterExpenses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expensesFilter: "",
      typing: false,
      typingTimeout: 0
    }
  }

  handleChange = (e) => {
    if (this.state.typingTimeout) {
       clearTimeout(this.state.typingTimeout);
    }
    const { onChange } = this.props;
    const filter = e.target.value;

    this.setState({
       expensesFilter: e.target.value,
       typing: false,
       typingTimeout: setTimeout(function () {
           onChange(filter);
         }, 500)
    });
  }

  render() {
    return (
      <div>
        <label htmlFor="filter">Filter by name: </label>
        <input type="text" id="filter"
          value={this.state.expensesFilter}
          onChange={this.handleChange}
          />
      </div>
      )
  }
}

export default filterExpenses