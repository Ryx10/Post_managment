import React, {Component} from "react";
import Logo from "../Logo/Logo";
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Logo childClasses="header__image" logoSrc={this.props.logoSrc}/>
        <h2 className="header__title">{this.props.title}</h2>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired
};

export default Header;
