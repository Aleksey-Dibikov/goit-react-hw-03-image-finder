import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  backDropClick = event => {
    // console.log('click');
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { modalImg } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.backDropClick}>
        <div className={s.Modal}>
          <img key={modalImg.id} src={modalImg.img} alt={modalImg.tags} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  modalImg: PropTypes.object,
};

export default Modal;
