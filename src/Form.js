import React from "react";
import "./Form.css";

const Form = props => {
  return (
    <div className="form">
      <form onSubmit={e => props.handleSearchText(e)}>
        <label htmlFor="searchText">Search product:</label>
        <input
          placeholder="search for anything"
          type="text"
          id="searchText"
          onChange={e => props.onSearchText(e)}
          value={props.searchText}
        />
        <button onSubmit={e => props.handleSearchText(e)}>Search</button>
        <button onClick={props.onClick}>Show all</button>
      </form>
    </div>
  );
};

export default Form;
