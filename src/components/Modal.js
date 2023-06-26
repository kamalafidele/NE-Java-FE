import React from 'react';
import ReactModal from 'react-modal';

import COLOR_PALETTE from '../constants/colors';

function Modal({ isOpen = false, closeModal, children }) {
    const customStyles = {
        content: {
          top: '30%',
          left: '30%',
          transform: 'translate(-20%, -20%)',
        },
        overlay: {
            background: COLOR_PALETTE.BLACK,
        }
      };

      ReactModal.setAppElement('#root')
    return (
        <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
            { children }
        </ReactModal>
    );
}

export default Modal;