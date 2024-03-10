import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDisplay from '../components/Gallery/ItemDisplay'; // Adjust the path as necessary

const ItemView = () => {
  const { itemId } = useParams(); // Access the itemId parameter
  const [item, setItem] = useState(null); // Initialize item state

  useEffect(() => {
    const fetchItemWithImages = async () => {
      try {
        // Construct the URL for the API call
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/items/${itemId}`;
        // Fetch the item with images from the API
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        const itemData = await response.json();
        // Set the fetched item data to state
        setItem(itemData);
      } catch (error) {
        console.error('Failed to fetch item with images:', error);
        // Handle the error state as appropriate
      }
    };

    // Invoke the fetch function
    fetchItemWithImages();
  }, [itemId]); // Depend on itemId to re-fetch if it changes

  // Conditional rendering: Only render the ItemDisplay component if item data is available
  return item ? <ItemDisplay item={item} /> : <div>Loading...</div>;
};

export default ItemView;
