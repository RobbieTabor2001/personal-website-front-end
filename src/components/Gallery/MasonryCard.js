import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MasonryCard = ({ data }) => {
  const { webpURL, pngURL, itemId } = data;

  // State to hold the current displayed image URL
  const [currentImageUrl, setCurrentImageUrl] = useState(webpURL);

  const navigate = useNavigate();

  useEffect(() => {
    const preloadImage = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = reject;
    });

    // Load the PNG image in the background and update the state when it's ready
    preloadImage(pngURL).then(() => {
      setCurrentImageUrl(pngURL); // Update the displayed image to the PNG
    });
    // No need to catch errors here for simplicity, but you could log or handle them as needed
  }, [pngURL]);

  return (
    <div className="gallery-item" onClick={() => navigate(`/item/${itemId}`)} style={{ width: '100%', margin: '0 auto' }}>
      <img src={currentImageUrl} alt="" style={{ width: '100%', display: 'block' }} />
    </div>
  );
};

MasonryCard.propTypes = {
  data: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    webpURL: PropTypes.string.isRequired,
    pngURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default MasonryCard;
