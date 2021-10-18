import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { query, toggleModal, bigImg } = this.props;
    return (
      <ul className={s.ImageGallery}>
        {query.map(el => (
          <ImageGalleryItem
            key={el.id}
            id={el.id}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            tags={el.tags}
            toggleModal={() => toggleModal()}
            bigImg={() => bigImg(el.id, el.largeImageURL, el.tags)}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  bigImg: PropTypes.func,
  toggleModal: PropTypes.func,
};

export default ImageGallery;
