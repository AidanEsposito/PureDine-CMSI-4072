import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Menus() {
  const query = useQuery().get("restaurantId");

  useEffect(() => {
    if (query) {
      console.log(`Navigated to Menus page with restaurantId: ${query}`);
      // Add future menu-fetching logic here if needed
    }
  }, [query]);

  return (
    <div className="menu-placeholder">
      <h2>Menus Page</h2>
      <p>Navigation successful. Awaiting menu logic...</p>
      <h1>I am the menu!</h1>
    </div>
  );
}

export default Menus;
