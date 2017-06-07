import React, {Component} from 'react';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import './header.scss';

class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        logoSrc: PropTypes.string.isRequired
    }
    render() {
        return (
            <header className="header">
                <Logo childClasses="header__image" logoSrc={this.props.logoSrc}/>
                <h2 className="header__title">{this.props.title}</h2>
            </header>
        );
    }
}

export default Header;
