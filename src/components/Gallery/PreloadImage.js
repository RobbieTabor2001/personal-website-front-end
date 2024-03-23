import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PreloadImage = ({ compressedURL, losslessURL, alt, style }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(compressedURL);

  useEffect(() => {
    const img = new Image();
    img.src = losslessURL;
    img.onload = () => setCurrentImageUrl(losslessURL); // Switch to losslessURL once loaded
  }, [losslessURL, compressedURL]); // Ensure dependencies are correctly listed

  return <img src={currentImageUrl} alt={alt} style={style} />;
};

PreloadImage.propTypes = {
  compressedURL: PropTypes.string.isRequired,
  losslessURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
};

export default PreloadImage;
