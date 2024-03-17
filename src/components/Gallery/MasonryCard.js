import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MasonryCard = ({ data }) => {
  const { webpURL, pngURL, itemId } = data;
  const [currentImageUrl, setCurrentImageUrl] = useState(webpURL);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = pngURL;
    img.onload = () => setCurrentImageUrl(pngURL);
  }, [pngURL]);

  return (
    <div className="gallery-item" onClick={() => navigate(`/item/${itemId}`)}>
      <img src={currentImageUrl} alt="" />
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
