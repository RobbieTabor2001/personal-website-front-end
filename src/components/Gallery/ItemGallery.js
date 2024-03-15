import React, { useState, useEffect } from 'react';
import { Masonry } from 'masonic';
import MasonryCard from './MasonryCard'; // Ensure this path is correct

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
          webpURL: item.sizes.large.webp,
          pngURL: item.sizes.large.png,
        }));

        // Preload all images before setting items
        await Promise.all(adaptedItems.map((item) => preloadImage(item.webpURL)));
        setItems(adaptedItems);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <Masonry
      items={items}
      columnWidth={columnWidth}
      columnGutter={columnGutter}
      render={({ data }) => <MasonryCard data={data} />}
      overscanBy={2}
    />
  );
};

export default ItemGallery;
