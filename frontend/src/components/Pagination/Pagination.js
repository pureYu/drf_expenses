import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal
} from "react-icons/fi";
import styles from "./Pagination.css";

export default class Pagination extends Component {
  static propTypes = {};

  render() {
    const { props } = this;
    const { pageCount = 5, onChangePage, forcePage } = props;
    return (
      !!pageCount && (
        <ReactPaginate
          forcePage={forcePage}
          onPageChange={onChangePage}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={<FiChevronLeft />}
          nextLabel={<FiChevronRight />}
          breakLabel={<FiMoreHorizontal />}
          containerClassName={`flex items-center list pa0 `}
          pageClassName={`flex items-center pointer pageButton`}
          breakClassName={`flex items-center break `}
          activeClassName={`active `}
          activeLinkClassName="gray1"
          disabledClassName="dn"
          pageLinkClassName="outline-0"
          nextLinkClassName=""
          previousLinkClassName=""
        />
      )
    );
  }
}

Pagination.defaultProps = {
  onChangePage: () => {}
};
