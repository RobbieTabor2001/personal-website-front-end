import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Gallery from '../components/Gallery/ItemGallery';
import Main from '../layouts/Main';

const ClothingGallery = () => {
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/images`; // Use environment variable for the API base URL
        console.log(apiUrl)
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const items = await response.json();
        console.log("Fetched items:", items);
        setGalleryImages(items);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <Main title="Clothing Gallery" description="Explore our clothing gallery">
      <div className="clothing-gallery-page">
        <h1>Clothing Gallery</h1>
        <Gallery images={galleryImages} onImageClick={navigateToItem} />
      </div>
    </Main>
  );
};

export default ClothingGallery;
