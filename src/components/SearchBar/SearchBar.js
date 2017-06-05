import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchValue: ''
    };
  }
  updateValue(evt){
    this.setState({
        searchValue: evt.target.value
    });
  }
  searchEvent(evt) {
    evt.preventDefault();
    this.props.searchPosts(this.state.searchValue);
  }
  render() {
    return (
      <div className="form-group">
        <div className="col-md-3">
          <input onChange={this.updateValue.bind(this)} type="text" className="form-control"/>
        </div>
        <button onClick={this.searchEvent.bind(this)} className="btn btn-primary">Go!</button>
        <div className="pull-right"><button className="btn btn-primary">Add new</button></div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchPosts: PropTypes.func.isRequired
};

export default SearchBar;

