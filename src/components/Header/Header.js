import React, {Component} from 'react';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import './header.scss';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import {Route, Link} from 'react-router-dom';

class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        logoSrc: PropTypes.string.isRequired,
        userData: PropTypes.string,
        userLogout: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
    }
    __renderUserInfo() {
        if(!!this.props.userData) {
            return(
                <span>Hello {this.props.userData} <a href="#" onClick={this.props.userLogout}>Sign out</a></span>
            );
        }
        else {
            return (
                <Link to="/login">Sign in</Link>
            );
        }
    }
    render() {
        return (
            <header className="col-d-10">
                <div className="text-right">{this.__renderUserInfo()}</div>
                <div className="header">
                    <Logo childClasses="header__item header__image" logoSrc={this.props.logoSrc}/>
                    <h2 className="header_s_item header__title">{this.props.title}</h2>
                    <span className="header__item">
                        <Route path="/posts/:id" component={Breadcrumbs} />
                    </span>
                </div>

            </header>
        );
    }
}

export default Header;
