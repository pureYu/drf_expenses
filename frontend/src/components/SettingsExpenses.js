import React, { Component } from 'react'
import {connect} from 'react-redux';
import {expenses} from '../actions'


class SettingsExpenses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limitSum: "",
      spentSum: 0,
    }
  }

  componentDidMount = () => {
    const limitSum = localStorage.getItem("limitSum");
    if (limitSum) {
      this.setState({ limitSum });
      this.props.checkSpentSum();
    }
  };

  componentDidUpdate(prevProps, prevState){

    const spentSum = Number(this.props.spentSum);
    const limitSum = Number(this.state.limitSum);
    if (this.state.limitSum != prevState.limitSum || this.props.spentSum != prevProps.spentSum) {
      this.setState({ limitExceed: (spentSum >= limitSum) });
    }
  }

  handleChangeLimit = (e) => {
    let { value, min, } = e.target;
    if (value !== "") {
      value = Math.max(Number(min), Number(value));
    }
    this.setState({
      limitSum: value
    })
    localStorage.setItem("limitSum", value);
    this.props.checkSpentSum();
  }

  clearLimits = () => {
    this.setState({
      limitSum: ""
    });
    localStorage.removeItem("limitSum");
  }

  render() {
    const { limitExceed } = this.state;
    return (
      <div>
        <label htmlFor="limit_sum">Set limit sum for today: </label>
        <input type="text" id="limit_sum"
          value={this.state.limitSum}
          onChange={e => this.handleChangeLimit(e)}
          type="number"
          min="0"
          className={`mr-2 ${
            this.state.limitExceed === true ? "limitExceed" : "limitNotExceed"
          }`}
          />
        <button type="button" className="close clear" aria-label="Clear"
          onClick={this.clearLimits}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      )
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
    spentSum: state.expenses.spentSum,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkSpentSum: (date) => {
      dispatch(expenses.checkSpentSum(date));                  // <<<<<<< TODO: refactoring???
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsExpenses);