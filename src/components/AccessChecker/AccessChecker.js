import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';

class AccessChecker extends Component {
    static propTypes ={
        isLogged: PropTypes.bool.isRequired,
        children: PropTypes.array
    }
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    __renderChild() {
        if(this.props.isLogged) {
            return this.props.children;
        } else {
            return (<Redirect to="/login"/>);
        }

    }
    render() {
        return (
            <div>
                {this.__renderChild()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(AccessChecker);
    