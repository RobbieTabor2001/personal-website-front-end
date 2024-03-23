import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Mainv2 from '../layouts/Mainv2';
import Gallery from '../components/Gallery/ItemGallery'; // Ensure the path to ItemGallery is correct

const ClothingGallery = () => {
  useEffect(() => {
    // Add the specific class to the body on mount
    document.body.classList.add('clothing-gallery-page');

    // Remove the class from the body on component unmount
    return () => {
      document.body.classList.remove('clothing-gallery-page');
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <Mainv2 title="Clothing Gallery" description="Explore our clothing gallery">
      <article className="post gallery-post" id="clothing-gallery">
        <Gallery/>
      </article>
    </Mainv2>
  );
};

export default ClothingGallery;
