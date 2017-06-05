import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="form-group">
        <div className="col-md-3">
          <input type="text" className="form-control"/>
        </div>
        <button className="btn btn-primary">Go!</button>
        <div className="pull-right"><button className="btn btn-primary">Add new</button></div>
      </div>
    );
  }
}

export default SearchBar;

