import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PreloadImage from './PreloadImage'; // Ensure this path matches your file structure
import "slick-carousel/slick/slick.css"; // Slick Carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Slick Carousel Theme CSS
import Slider from 'react-slick'; // Import Slider component

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

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  // Use the largest possible dimensions as a maximum for the slider's container
  const sliderStyle = {
    maxWidth: '700px', // Max width for the largest image
    margin: 'auto', // Center the slider
    overflow: 'hidden', // Prevent overflow
  };

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div style={sliderStyle}>
        <Slider {...settings}>
          {extralargeImages.map((imageObj, index) => (
            <div key={`${imageObj.png}-${index}`}>
              <PreloadImage
                webpUrl={imageObj.webp}
                pngUrl={imageObj.png}
                alt={`${item.name} view ${index + 1}`}
                style={{ width: '100%', display: 'block' }} // Images will scale within these constraints
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ItemDisplay;
