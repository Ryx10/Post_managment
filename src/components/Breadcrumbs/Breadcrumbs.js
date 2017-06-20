import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './breadcrumbs.scss';
import PropTypes from 'prop-types';

class Breadcrumbs extends Component {
    static propTypes = {
        location: PropTypes.object
    }
    __renderBreadcrumbs(){
        const pathParts = this.props.location.pathname.split('/');
        let lastElement = pathParts.pop();
        lastElement = lastElement === 'new' ? 'New post' : `Post id:${lastElement}`;
        let currentUrl = '/';
        let breadcrumbs = pathParts.map((part, i) => {
            if(!part.length) { return ; }


            const el = (
               <span key={i} className="breadcrumbs__link">
                   <Link to={currentUrl}>{part}</Link>
                   &nbsp;>&nbsp;
               </span>
            );
            currentUrl = `${currentUrl}/${part}`;
            return el;
        });
        breadcrumbs.push(<span key={breadcrumbs.length} className="breadcrumbs__element">{lastElement}</span>);
        return breadcrumbs;
    }
    render() {
        return (
            <div className="breadcrumbs">
                {this.__renderBreadcrumbs()}
            </div>
        );
    }
}

export default Breadcrumbs;
    