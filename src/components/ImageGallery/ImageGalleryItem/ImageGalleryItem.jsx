import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  GalleryItemImageStyled,
  GalleryItemStyled,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModalByClick = e => {
    if (e.target.nodeName !== 'IMG') {
      setIsModalOpen(false);
    }
  };
  const closeModalByEsc = () => setIsModalOpen(false);
  return (
    <GalleryItemStyled>
      <GalleryItemImageStyled
        src={webformatURL}
        alt={tags}
        onClick={openModal}
      />
      {isModalOpen && (
        <Modal
          src={largeImageURL}
          alt={tags}
          onClickClose={closeModalByClick}
          onEscClose={closeModalByEsc}
        />
      )}
    </GalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = PropTypes.shape({
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}).isRequired;
