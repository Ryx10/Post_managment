import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './logo.scss';

class Logo extends Component {
    static propTypes = {
        childClasses: PropTypes.string,
        logoSrc: PropTypes.string.isRequired
    };
    render() {
        return <img className={this.props.childClasses} src={this.props.logoSrc} />;
    }
}

export default Logo;
