import React from "react";
import Logo from "./Logo";
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <header className="header">
      <Logo childClasses="header__image" logoSrc={props.logoSrc}/>
      <h2 className="header__title">{props.title}</h2>
    </header>
  );
};

Header.porpTypes = {
  title: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired
};

export default Header;
