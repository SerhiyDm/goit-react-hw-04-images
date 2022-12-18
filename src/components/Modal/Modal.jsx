import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { OverlayStyled, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ src, alt, onClickClose, onEscClose }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        onEscClose();
      }
    };

    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [onEscClose]);

  return createPortal(
    <OverlayStyled onClick={onClickClose}>
      <ModalStyled>
        <img src={src} alt={alt}></img>
      </ModalStyled>
    </OverlayStyled>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onEscClose: PropTypes.func.isRequired,
};
