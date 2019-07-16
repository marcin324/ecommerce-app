import React from "react";
import "./Pagination.css";

const Pagination = props => {
  return (
    <div className="pagin">
      <i
        onClick={props.handlePrevPage}
        className={`icon-left-open-big ${props.chevronLeft}`}
      />
      <form onSubmit={e => props.handleChangePage(e)}>
        <input
          type="number"
          id="number"
          onChange={e => props.onChangePage(e)}
          value={props.activePage}
        />
        <span>from</span>
        {props.numberOfPages}
      </form>
      <i
        onClick={props.handleNextPage}
        className={`icon-right-open-big ${props.chevronRight}`}
      />
    </div>
  );
};

export default Pagination;
