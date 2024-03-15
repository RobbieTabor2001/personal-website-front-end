import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PreloadImage = ({ webpUrl, pngUrl, alt, style }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(webpUrl);

  useEffect(() => {
    const img = new Image();
    img.src = pngUrl;
    img.onload = () => setCurrentImageUrl(pngUrl); // Switch to PNG once loaded
  }, [pngUrl]);

  return <img src={currentImageUrl} alt={alt} style={style} />;
};

PreloadImage.propTypes = {
  webpUrl: PropTypes.string.isRequired,
  pngUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
};

export default PreloadImage;
