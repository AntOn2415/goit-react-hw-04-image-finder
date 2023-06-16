import React from 'react';
import PropTypes from 'prop-types';
import { GalleryUl } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ gallery, handleImageClick }) => {
  if (gallery.length === 0) {
    return null;
  }

  return (
    <GalleryUl>
      {gallery.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          tags={image.tags}
          onClick={() => handleImageClick(image.largeImageURL, image.tags)}
        />
      ))}
    </GalleryUl>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
