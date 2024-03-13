import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemDisplay = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemWithImageUrls = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/items/${itemId}`);
        if (!response.ok) {
          throw new Error('Item not found');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Failed to fetch item:', error);
      }
    };

    if (itemId) {
      fetchItemWithImageUrls();
    }
  }, [itemId]);

  if (!item) {
    return <div>Loading or item not found...</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div>
        {item.images.map((imageObj, index) => {
          // Removed trailing spaces and changed to dot notation
          const imageUrl = imageObj.extralarge || imageObj.default; // Corrected to use dot notation
          // Use a more unique key if possible. If image URLs are unique, they can serve as keys.
          return (
            <img
              key={imageUrl} // Changed from using index to imageUrl for a unique key
              src={imageUrl}
              alt={`${item.name} view ${index + 1}`}
              style={{ width: '100%', marginBottom: '10px' }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;
