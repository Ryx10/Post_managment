import React from "react";
import PropTypes from "prop-types";

const Logo = (props) => {
  return <img className={props.childClasses} src={props.logoSrc} />;
};

Logo.propTypes = {
  childClasses: PropTypes.string,
  logoSrc: PropTypes.string.isRequired

};

export default Logo;
