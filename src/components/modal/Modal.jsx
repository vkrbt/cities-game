import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => (
  props.isOpen ? ReactDOM.createPortal(
    <div className="modal-overlay">
      <div role="dialog" className="container modal-content">
        {props.children}
      </div>
    </div>,
    document.getElementById('root'),
  ) : null
);

export default Modal;
