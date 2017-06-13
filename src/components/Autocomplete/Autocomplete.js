import React, {Component} from 'react';
import './autocomplete.scss';
import PropTypes from 'prop-types';
class Autocomplete extends Component {
    static propTypes = {
        postTitles: PropTypes.object,
        searchEvent: PropTypes.func.isRequired,
        options: PropTypes.array

    }
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
    }
    __renderOptions() {
        if(this.state.searchValue.length === 0) return ;
        const filteredOptions =  this.props.options.filter( el => el.label.indexOf(this.state.searchValue) > -1 );
        const optionsToDisplay = filteredOptions.map( (el, i) => <option value={el.label} className="autocomplete__list-item" key={i} onClick={() => this.__chooseOption(el.label)} /> );
        return optionsToDisplay;
    }
    __updateSearchValue = (evt) => {
        this.setState({searchValue: evt.target.value});
    }
    __chooseOption = (value) => {
        this.setState({searchValue: value});
    }
    render() {
        return (
            <div className="autocomplete">
                <div className="autocomplete__input col-md-3">
                    <input className="form-control" list="posts" onChange={this.__updateSearchValue}/>
                </div>
                <datalist id="posts" className="autocomplete__list">
                    {this.__renderOptions()}
                </datalist>
                <button onClick={() => this.props.searchEvent(this.state.searchValue)} className="btn autocomplete__btn">Go!</button>
            </div>
        );
    }
}

export default Autocomplete;
    