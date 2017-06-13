import React, {Component} from 'react';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import './header.scss';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import {Route} from 'react-router-dom';

class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        logoSrc: PropTypes.string.isRequired
    }
    render() {
        return (
            <header className="header col-d-10">
                <Logo childClasses="header__item header__image" logoSrc={this.props.logoSrc}/>
                <h2 className="header_s_item header__title">{this.props.title}</h2>
                <span className="header__item">
                    <Route path="/posts/:id" component={Breadcrumbs} />
                </span>
            </header>
        );
    }
}

export default Header;
