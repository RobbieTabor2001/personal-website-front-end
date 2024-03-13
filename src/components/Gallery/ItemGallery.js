import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Masonry } from 'masonic';
import { useNavigate } from 'react-router-dom';

const MasonryCard = ({ data }) => {
  const { imageUrls, itemId } = data; // Destructure `imageUrls` directly from `data`

  // Use the 'default' image for display in the Masonry layout
  const imageURL = imageUrls.extralarge; // Access `default` from `imageUrls`

  const navigate = useNavigate();

  return (
    <div className="gallery-item" onClick={() => navigate(`/item/${itemId}`)} style={{ width: '100%', margin: '0 auto' }}>
      <img src={imageURL} alt="" style={{ width: '100%', display: 'block' }} />
    </div>
  );
};

MasonryCard.propTypes = {
  data: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    imageUrls: PropTypes.shape({
      default: PropTypes.string.isRequired,
      extrasmall: PropTypes.string,
      small: PropTypes.string,
      medium: PropTypes.string,
      large: PropTypes.string,
      extralarge: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const ItemGallery = () => {
  const [items, setItems] = useState([]);
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

    const fetchItems = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/images`; // Ensure this URL is correct
        const response = await fetch(apiUrl);
        const data = await response.json();
        setItems(data); // Expecting 'data' to be an array of items with 'itemId' and 'images'
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <Masonry
      items={items}
      columnWidth={columnWidth}
      columnGutter={columnGutter}
      // Adjusted to match the expected data structure in each item
      render={({ data }) => <MasonryCard data={data} />}
      overscanBy={2}
    />
  );
};

export default ItemGallery;
