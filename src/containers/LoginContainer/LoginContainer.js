import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './login-container.scss';
import {connect} from "react-redux";
import {loginAction, checkLogin, checkPassword} from '../../actions/actionsCreators';
import AlertContainer from 'react-alert';


class LoginContainer extends Component {
    static propTypes = {
        loginAction: PropTypes.func.isRequired,
        isLogged: PropTypes.bool.isRequired,
        token: PropTypes.string,
        loginIsValid: PropTypes.bool.isRequired,
        passwordIsValid: PropTypes.bool.isRequired,
        checkLogin: PropTypes.func.isRequired,
        checkPassword: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
    }
    __showAlert = (message, type) => {
        this.msg.show(message, {
            time: 5000,
            type: type,
            theme: 'light'
        });
    };
    __loginEvent(evt) {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        if(!this.props.loginIsValid) {
            this.__showAlert('Login must be an email and can\'t be empty','error');
        }
        if (!this.props.passwordIsValid) {
            this.__showAlert('Password is required', 'error');
        }
        this.props.loginIsValid && this.props.passwordIsValid && this.props.loginAction(formData.get('login'), formData.get('password'), this.__showAlert);
    }
    __renderLoginForm() {
        if(!!this.props.token) {
            return(
                <div>User is logged</div>
            );
        } else {
            return(
                <form className="login-form col-md-6 col-md-offset-3" onSubmit={(evt) => this.__loginEvent(evt)}>
                    <div className="form-group">
                        <label htmlFor="">Email address</label>
                        <input className="form-control" type="email" name="login" onChange={(evt) => this.props.checkLogin(evt.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input className="form-control" type="password" name="password" onChange={(evt) => this.props.checkPassword(evt.target.value)} />
                    </div>
                    <button type="submit" className="login-form__submit btn btn-submit">Login</button>
                </form>
            );
        }
            }
    render() {
        return (
            <div>
                {this.__renderLoginForm()}
                <AlertContainer ref={a => this.msg = a} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.login.isLogged,
    loginEmail: state.login.loginEmail,
    isFetching: state.login.isFetching,
    token: state.login.token,
    loginIsValid: state.validation.loginIsValid,
    passwordIsValid: state.validation.passwordIsValid

});

const mapDispatchToProps = dispatch => ({
    loginAction: (login, password, showAlert) => dispatch(loginAction(login, password, showAlert)),
    checkLogin: value => dispatch(checkLogin(value)),
    checkPassword: value => dispatch(checkPassword(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
