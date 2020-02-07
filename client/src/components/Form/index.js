import React from "react";

function Form({ searchTerm, handleInputChange, handleFormSubmit, handleFrontPageSubmit }) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Search Term">
          <strong>Article</strong>
        </label>
        <input
          className="form-control"
          id="Title"
          type="text"
          value={searchTerm}
          placeholder="Redux"
          name="searchTerm"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="pull-right">
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Search
        </button>
        <button
          onClick={handleFrontPageSubmit}
          type="submit"
          style={{ margin: '0px 10px' }}
          className="btn btn-lg btn-secondary float-right"
        >
          Front Page
        </button>
        
        <select name="hitsPerPage" onChange={handleInputChange}>
          <option value="Choose" disabled>Choose:</option>
          <option value={10}>10</option>
          <option value={20} selected>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
        <label htmlFor="Results Per Page">
          <strong>Results Per Page</strong>
        </label>
      </div>
    </form>
  );
}

export default Form;
