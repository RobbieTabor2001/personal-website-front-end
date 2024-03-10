import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ItemDisplay = ({ item }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (item) {
      // Fetch URLs for each image in parallel
      Promise.all(item.images.map(imagePath => 
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/s3/image-url/${encodeURIComponent(imagePath)}`)
          .then(response => response.json())
          .then(data => data.imageUrl)
          .catch(error => {
            console.error('Failed to fetch image URL:', error);
            return ''; // Return an empty string or some placeholder on error
          })
      )).then(setImageUrls); // Update state with all fetched URLs
    }
  }, [item]); // Rerun effect if item changes

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div>
        {imageUrls.map((src, index) => (
          <img key={index} src={src} alt={`${item.name} ${index + 1}`} style={{ width: '100%', marginBottom: '10px' }} />
        ))}
      </div>
    </div>
  );
};

ItemDisplay.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ItemDisplay;
