import React, {Component} from 'react';
import './preloader.scss';
import PropTypes from 'prop-types';

class Preloader extends Component {
    static propTypes ={
        classNames: PropTypes.string
    }
    render() {
        return (
            <div className={this.props.classNames}>Loading...</div>
        );
    }
}

export default Preloader;
    