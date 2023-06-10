import React from 'react';
import PropTypes from 'prop-types';
import { GalleryLi } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <GalleryLi>
      <img onClick={onClick} src={webformatURL} alt={tags} />
    </GalleryLi>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
