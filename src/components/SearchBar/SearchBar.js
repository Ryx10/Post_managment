import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './search-bar.scss';
import Autocomplete from '../Autocomplete/Autocomplete';

class SearchBar extends Component {
    static propTypes = {
        updateValue: PropTypes.func,
        searchEvent: PropTypes.func.isRequired,
        postsTitles: PropTypes.array
    };

    render() {
        return (
            <div className="form-group search-bar">
                <Link to="posts/new">
                    <div className="pull-right"><button className="btn search-bar__btn">Add new</button></div>
                </Link>
                <Autocomplete
                    options={this.props.postsTitles}
                    searchEvent={this.props.searchEvent}
                />
            </div>
        );
    }
}

export default SearchBar;

