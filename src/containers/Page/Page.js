import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


import './page.scss';
import {baseConfig} from '../../config';

class Page extends Component {
    static propTypes = {
        children: PropTypes.array
    }
    render() {
        return (
            <div className="app-container container">
                <div className="row">
                    <Header title={baseConfig.header.title} logoSrc={baseConfig.header.logoSrc} />
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

export default Page;
