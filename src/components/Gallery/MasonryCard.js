import React from 'react';
import PropTypes from 'prop-types';
import PreloadImage from './PreloadImage'; // Adjust the path as necessary

const MasonryCard = ({ data }) => {
  // Assuming data contains the compressedURL and losslessURL
  const { compressedURL, losslessURL } = data;

  return (
    <div className="gallery-item" >
      <PreloadImage
        compressedURL={compressedURL}
        losslessURL={losslessURL} // Example: using itemId as alt text, adjust as necessary
      />
    </div>
  );
};

MasonryCard.propTypes = {
  data: PropTypes.shape({
    compressedURL: PropTypes.string.isRequired,
    losslessURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default MasonryCard;
