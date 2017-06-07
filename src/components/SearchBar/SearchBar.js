import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search-bar.scss';

class SearchBar extends Component {
    static propTypes = {
        updateValue: PropTypes.func.isRequired,
        searchEvent: PropTypes.func.isRequired
    };
    render() {
        return (
            <div className="form-group search-bar">
                <div className="col-md-3 search-bar__input">
                    <input onChange={this.props.updateValue} type="text" className="form-control"/>
                </div>
                <button onClick={this.props.searchEvent} className="btn search-bar__btn">Go!</button>
                <div className="pull-right"><button className="btn search-bar__btn">Add new</button></div>
            </div>
        );
    }
}

export default SearchBar;

