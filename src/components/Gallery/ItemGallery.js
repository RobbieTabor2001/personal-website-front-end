import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Masonry } from 'masonic';
import { useNavigate } from 'react-router-dom';

// MasonryCard component definition
const MasonryCard = ({ data, navigate }) => {
  const { _id, imagePath, itemId } = data;
  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/s3/image-url/${encodeURIComponent(imagePath)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Failed to fetch image URL:', error);
      }
    };
    fetchImageUrl();
  }, [imagePath]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      key={_id}
      className="gallery-item"
      onClick={() => navigate(`/item/${itemId}`)}
      style={{ width: '100%', margin: '0 auto', display: isImageLoaded ? 'block' : 'none' }}
    >
      {imageUrl && <img src={imageUrl} alt="" style={{ width: '100%', display: 'block' }} onLoad={handleImageLoad} />}
    </div>
  );
};

MasonryCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

// ItemGallery component definition
const ItemGallery = ({ images }) => {
  const navigate = useNavigate();
  const [columnWidth, setColumnWidth] = useState(200);
  const [columnGutter, setColumnGutter] = useState(10);

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        setColumnWidth(100);
        setColumnGutter(1);
      } else if (screenWidth >= 600 && screenWidth < 1000) {
        setColumnWidth(150);
        setColumnGutter(2);
      } else {
        setColumnWidth(200);
        setColumnGutter(3);
      }
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <Masonry
      items={images}
      columnWidth={columnWidth}
      columnGutter={columnGutter}
      render={(props) => <MasonryCard {...props} navigate={navigate} />}
      overscanBy={10}
    />
  );
};

ItemGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
  })).isRequired,
};

export default ItemGallery;
