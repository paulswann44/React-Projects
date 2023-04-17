import React from 'react';
import PropTypes from 'prop-types';

function Modal({ title, content, isOpen, onClose }) {
  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{content}</div>
      </div>
      <div className="modal-overlay" onClick={onClose}></div>
    </div>
  ) : null;
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
