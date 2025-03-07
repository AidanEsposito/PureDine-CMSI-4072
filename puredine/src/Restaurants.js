import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getResturants } from './Api.js';  

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Restaurants() {
  const query = useQuery().get("query"); 
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!query) return;

      try {
        setLoading(true);
        // Call the getResturants API to fetch restaurant data
        const data = await getResturants(query);  
        // Set the restaurant data in the state
        setRestaurants(data.results);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    // Call the fetchRestaurants function
    fetchRestaurants();
  }, [query]);

  return (
    <div className="restaurant-list">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : restaurants.length > 0 ? (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.place_id} className="restaurant-card">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.formatted_address}</p>
              <p>⭐ Rating: {restaurant.rating || "N/A"}</p>
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
