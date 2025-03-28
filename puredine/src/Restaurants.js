import React, { useEffect, useState } from 'react';
import './Restaurants.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRestaurants } from './Api.js';  

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const getImageUrl = (photoReference, apiKey) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}`;
};

function Restaurants() {
  const query = useQuery().get("query"); 
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMenuClick = (restaurantId) => {
    navigate(`/Menus?restaurantId=${restaurantId}`);
 };

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const data = await getRestaurants(query);  
        setRestaurants(data.results);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [query]);


  //Photos available?
  return (
    <div className="restaurant-list" onClick={() => window.location.href = '/menus'}>
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : restaurants.length > 0 ? (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.place_id} className="restaurant-card" onClick={() => handleMenuClick(restaurant.place_id)} style={{cursor: 'pointer'}}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.formatted_address}</p>
              <p>⭐ Rating: {restaurant.rating || "N/A"}</p>

              
              {/* {restaurant.photos && restaurant.photos.length > 0 && (
                <img
                  src={getImageUrl(restaurant.photos[0].photo_reference)}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
              )} */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
  );
}

export default Restaurants;