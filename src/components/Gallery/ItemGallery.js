import React, { useState, useEffect, useCallback } from 'react';
import { Masonry, useInfiniteLoader } from 'masonic';
import MasonryCard from './MasonryCard'; // Ensure this path is correct

const ItemGallery = () => {
  const [items, setItems] = useState([]);
  const [cursors, setCursors] = useState({ single: null, multi: null });
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const limit = 25; // Set the number of items to fetch per request

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

  // Function to fetch items, adapted for pagination
  const fetchItems = useCallback(async (cursorSingle, cursorMulti, limit) => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/paginated-images?limit=${limit}` +
                   `${cursorSingle ? `&cursorSingle=${cursorSingle}` : ''}` +
                   `${cursorMulti ? `&cursorMulti=${cursorMulti}` : ''}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch items');
    const data = await response.json();

    // Process and return data
    return {
      nextCursorMulti: data.nextCursorMulti,
      nextCursorSingle: data.nextCursorSingle,
      multiImages: data.multImages,
      singleImages: data.singleImages, // Combine single and multi-image item
      images: data.images
    };
  }, []);

  // Load more items function, adapted for cursor-based pagination
  const loadMoreItems = useCallback(async (startIndex, stopIndex) => {
    if (!hasMoreItems) return;
    try {
      const {images, nextCursorSingle, nextCursorMulti } = await fetchItems(cursors.single, cursors.multi, limit);
      
              // Adapt single image items
              let adaptedItems = images.map(item => ({
                ...item,
                compressedURL: item.medium.compressed,
                losslessURL: item.medium.lossless,
              }));

              adaptedItems = shuffleArray(adaptedItems);
                      // Preload small compressed images for faster UI rendering
        await Promise.all(adaptedItems.map(item => preloadImage(item.compressedURL)));
      setItems((currentItems) => [...currentItems, ...adaptedItems]);
      setCursors({ single: nextCursorSingle, multi: nextCursorMulti });
      // Update hasMoreItems based on whether cursors are present
      console.log(nextCursorMulti);
      console.log(nextCursorSingle);
      console.log("fcuirha");
      setHasMoreItems((nextCursorSingle !== null && nextCursorMulti !== null));
      console.log((nextCursorSingle !== null && nextCursorMulti !== null));
    } catch (error) {
      console.error('Error loading more items:', error);
    }
  }, [cursors, hasMoreItems, fetchItems, limit]);

  const maybeLoadMore = useInfiniteLoader(loadMoreItems, {
    isItemLoaded: (index, items) => !!items[index],
    minimumBatchSize: limit,
    threshold: 3,
  });

  useEffect(() => {
    // Initial fetch is just a special case of loading more items
    loadMoreItems(0, limit);
  }, [loadMoreItems, limit]);

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
