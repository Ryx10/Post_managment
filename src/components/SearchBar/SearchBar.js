import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './search-bar.scss';
import debounce from 'lodash/debounce';


class SearchBar extends Component {
    static propTypes = {
        updateValue: PropTypes.func,
        searchEvent: PropTypes.func.isRequired,
        postsTitles: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.__debouceSearchValue = debounce((evt) => this.props.updateInputValue(evt.target.value), 100);

    }
    __renderOptions() {
        if(!this.props.inputValue.length) { return ; }
        const filteredOptions =  this.props.postsTitles.filter( el => el.label.indexOf(this.props.inputValue) > -1 );
        const optionsToDisplay = filteredOptions.map( (el, i) => <option value={el.label} className="autocomplete__list-item" key={i} onClick={() => this.__chooseOption(el.label)} /> );
        return optionsToDisplay;
    }
    __updateSearchValue = (evt) => {
        evt.persist();
        this.__debouceSearchValue(evt);

    }
    __chooseOption = (value) => {
        this.props.updateInputValue(value);
    }
    render() {
        return (
            <div className="form-group search-bar">
                <Link to="posts/new">
                    <div className="pull-right"><button className="btn search-bar__btn">Add new</button></div>
                </Link>
                <div className="autocomplete">
                    <div className="autocomplete__input col-md-3">
                        <input className="form-control" list="posts" onChange={this.__updateSearchValue}/>
                    </div>
                    <datalist id="posts" className="autocomplete__list">
                        {this.__renderOptions()}
                    </datalist>
                    <button onClick={() => this.props.searchEvent(this.props.inputValue)} className="btn autocomplete__btn">Go!</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;

