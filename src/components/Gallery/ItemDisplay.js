import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PreloadImage from './PreloadImage'; // Ensure this path matches your file structure

const ItemDisplay = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemWithImageUrls = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/items/${itemId}`);
        if (!response.ok) throw new Error('Item not found');
        const data = await response.json();
        setItem(data); // Keep the data structure as is, filter when rendering
      } catch (error) {
        console.error('Failed to fetch item:', error);
      }
    };

    fetchItemWithImageUrls();
  }, [itemId]);

  if (!item) {
    return <div>Loading or item not found...</div>;
  }

  // Filter images for "extralarge" size before flattening the array
  const extralargeImages = item.images
    .flat()
    .filter(image => image.size === 'extralarge');

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div>
        {extralargeImages.map((imageObj, index) => (
          <PreloadImage
            key={`${imageObj.png}-${index}`} // Using PNG URL and index for a unique key
            webpUrl={imageObj.webp}
            pngUrl={imageObj.png}
            alt={`${item.name} view ${index + 1}`}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemDisplay;
