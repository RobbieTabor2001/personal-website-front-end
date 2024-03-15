import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Main from '../layouts/Main'; // Adjust the path to Main layout as necessary
import ItemDisplay from '../components/Gallery/ItemDisplay'; // Ensure the path to ItemDisplay is correct

const ItemView = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemWithImages = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/items/${itemId}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const itemData = await response.json();
        setItem(itemData);
      } catch (error) {
        console.error('Failed to fetch item with images:', error);
      }
    };

    fetchItemWithImages();
  }, [itemId]);

  return (
    <Main
      title={item ? item.name : 'Loading...'}
      description={item ? `Viewing ${item.name}` : 'Loading item'}
    >
      <article className="post" id="item-view">
        <header>
          <div className="title">
            <h2>{item ? <Link to={`/item/${itemId}`}>{item.name}</Link> : 'Loading...'}</h2>
            <p>{item ? item.description : 'Please wait while the item is being loaded'}</p>
          </div>
        </header>
        {item ? <ItemDisplay item={item} /> : <div>Loading...</div>}
      </article>
    </Main>
  );
};

export default ItemView;
