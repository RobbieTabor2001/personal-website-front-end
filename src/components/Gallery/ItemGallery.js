import React, { useState, useEffect, useCallback } from 'react';
import { Masonry, useInfiniteLoader } from 'masonic';
import MasonryCard from './MasonryCard';// Ensure this path is correct

const ItemGallery = () => {
  const [items, setItems] = useState([]);
  const [columnWidth, setColumnWidth] = useState(300);
  const [columnGutter, setColumnGutter] = useState(20);

  const loadMoreItems = useCallback(async (startIndex, stopIndex) => {
    // Here, you'd typically make an API call to fetch more items.
    // Since you're not using pagination, you can duplicate existing items or cycle through them.
    const newItems = [...items]; // Duplicate the current items for the example
    setItems((currentItems) => [...currentItems, ...newItems]);
  }, [items]);


  const maybeLoadMore = useInfiniteLoader(loadMoreItems, {
    isItemLoaded: (index, items) => !!items[index],
    minimumBatchSize: 50, // Number of items to load at once
    threshold: 3, // How far from the end to start loading more
  });


  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
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
        const { allSingleImageURLs, allMultiImageUrls } = await response.json();
    
        // Adapt single image items
        let adaptedSingleImagesItems = allSingleImageURLs.map(item => ({
          ...item,
          compressedURL: item.sizes.medium.compressed,
          losslessURL: item.sizes.medium.lossless,
        }));
    
        // Adapt multi image items
        let adaptedMultiImages = allMultiImageUrls.map(item => ({
          ...item,
          compressedURL: item.medium.compressed,
          losslessURL: item.medium.lossless,
        }));
    
        // Merge adapted single and multi-image items
        let adaptedItems = adaptedSingleImagesItems.concat(adaptedMultiImages);
        adaptedItems = shuffleArray(adaptedItems);
    
        // Preload small compressed images for faster UI rendering
        await Promise.all(adaptedItems.map(item => preloadImage(item.compressedURL)));
    
        setItems(adaptedItems);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    
    fetchItems();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      <header className="item-gallery-header" id="gallery-header">
        <div className="title-container">
          <h1 className='gallery-title'>Robert's Collection</h1>
        </div>
        <div className="button-container">
          <button className="gallery-button">Small</button>
          <span>/</span>
          <button className="gallery-button">Medium</button>
          <span>/</span>
          <button className="gallery-button">Large</button>
        </div>
      </header>
      <Masonry
        items={items}
        columnWidth={300}
        columnGutter={20}
        render={({ data }) => <MasonryCard data={data} />}
        overscanBy={5}
        onRender={maybeLoadMore} // Trigger load more items
      />
      <footer className="footer">
        <a href="#!" id="back-to-top" onClick={scrollToTop}>Back to Top</a>
      </footer>
    </>
  );
};

export default ItemGallery;
