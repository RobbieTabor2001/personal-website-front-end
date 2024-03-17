import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Mainv2 from '../layouts/Mainv2';
import Gallery from '../components/Gallery/ItemGallery'; // Ensure the path to ItemGallery is correct

const ClothingGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const preloadImage = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });

    const fetchItems = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/images`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Adapt each item to include the preferred image URL for the MasonryCard
        const adaptedItems = data.map((item) => ({
          ...item,
          preferredImageUrl: item.sizes.large.webp || item.sizes.large.png,
          // Preference for 'large' size, 'webp' format
        }));

        // Preload images
        const preloadPromises = adaptedItems.map((item) => preloadImage(item.preferredImageUrl));
        await Promise.all(preloadPromises);

        setGalleryImages(adaptedItems);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Mainv2 title="Clothing Gallery" description="Explore our clothing gallery">
      <article className="post" id="clothing-gallery">
        <header>
          <div className="title">
            <h2><Link to="/gallery">Clothing Gallery</Link></h2>
            <p>Explore a selection of our finest clothing items</p>
          </div>
        </header>
        <Gallery images={galleryImages} />
      </article>
    </Mainv2>
  );
};

export default ClothingGallery;
