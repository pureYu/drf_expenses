import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";


class FilterExpenses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterTitle: "",
      filterDateFrom: "",
      filterDateTill: "",
      typing: false,
      typingTimeout: 0
    }
  }

  handleChange = (e) => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const { onChange } = this.props;
    const title = e.target.value;
    const dateFrom = this.state.filterDateFrom;
    const dateTill = this.state.filterDateTill;

    this.setState({
      filterTitle: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        onChange(title, dateFrom, dateTill);
      }, 500)
    });
  }

  handleChangeDate = (name, value) => {
    const date = (value instanceof Date) ? moment(value).format("YYYY-MM-DD") : '';
    if (name === 'filterDateFrom') {
      this.setState({
        filterDateFrom: date
      });
      this.props.onChange(this.state.filterTitle, date, this.state.filterDateTill);
    } else {
      this.setState({
        filterDateTill: date
      });
      this.props.onChange(this.state.filterTitle, this.state.filterDateFrom, date);
    }
  };

  clearFilters = () => {
    this.setState({
      filterTitle: "",
      filterDateFrom: "",
      filterDateTill: ""
    });
    this.props.onChange("", "", "");      // <<<<<<<< - TODO - refactoring
  }

  render() {
    return (
      <div>
        <label htmlFor="filter_title">Filter by name: </label>
        <input type="text" id="filter_title"
          value={this.state.filterTitle}
          onChange={this.handleChange}
          />
        <div className="clear-both" />
        <label htmlFor="filter_date_from">Date spent from: </label>
        <DatePicker
          selected={this.state.filterDateFrom ? new Date(this.state.filterDateFrom) : ""}
          onChange={this.handleChangeDate.bind(this, 'filterDateFrom')}
          locale="uk"
          dateFormat="yyyy-MM-dd"
          name="filter_date_from"
        />
        <label htmlFor="filter_date_till">Date spent till: </label>
        <DatePicker
          selected={this.state.filterDateTill ? new Date(this.state.filterDateTill) : ""}
          onChange={this.handleChangeDate.bind(this, 'filterDateTill')}
          locale="uk"
          dateFormat="yyyy-MM-dd"
          name="filter_date_till"
        />
        <button type="button" className="close clear" aria-label="Clear"
          onClick={this.clearFilters}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      )
  }
}

export default FilterExpenses