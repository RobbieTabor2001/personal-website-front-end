import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MasonryCard = ({ data: { _id, imagePath, itemId }, width, navigate }) => {
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
    setIsImageLoaded(true); // Set image load status to true when the image has loaded
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
  width: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired, // Add navigate to propTypes
};

export default MasonryCard;
