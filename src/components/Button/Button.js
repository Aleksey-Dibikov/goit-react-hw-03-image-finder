import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './Button.module.css';

class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className={s.Button} type="button" onClick={onClick}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
