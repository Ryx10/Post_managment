import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


import './page.scss';
import {baseConfig} from '../../config';
import {connect} from 'react-redux';
import {getLoggedUserData, userLogout} from '../../actions/actionsCreators';
import {withRouter} from 'react-router';

class Page extends Component {
    static propTypes = {
        children: PropTypes.array,
        isLogged: PropTypes.bool.isRequired,
        loggedUser: PropTypes.string,
        getLoggedUserData: PropTypes.func.isRequired,
        userLogout: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);

    }
    componentDidUpdate() {
        if(this.props.isLogged && !this.props.loggedUser) {
            this.props.getLoggedUserData();
        }
    }
    render() {
        return (
            <div className="app-container container">
                <div className="row">
                    <Header userLogout={this.props.userLogout} userData={this.props.loggedUser} title={baseConfig.header.title} logoSrc={baseConfig.header.logoSrc} />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
                <div className="row">
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.login.isLogged,
    loggedUser: state.login.loggedUser
});

const mapDispatchToProps = dispatch => ({
    getLoggedUserData: () => dispatch(getLoggedUserData(localStorage.getItem('token'))),
    userLogout: () => dispatch(userLogout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
