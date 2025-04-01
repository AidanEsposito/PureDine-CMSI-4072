import React, { useState } from "react";
import "./Menus.css";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Menu() {
  const query = useQuery();
  const restaurantId = query.get("restaurantId"); 
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const allergies = ["Peanuts", "Soy", "Shellfish", "Dairy", "Gluten", "Eggs"];

  const toggleAllergy = (allergy) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
    );
  };

  return (
    <div>
      <h2>Menu for Restaurant ID: {restaurantId}</h2>

      <h3>Allergy Filters:</h3>
      {allergies.map((allergy) => (
        <label key={allergy} style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            value={allergy}
            checked={selectedAllergies.includes(allergy)}
            onChange={() => toggleAllergy(allergy)}
          />
          {allergy}
        </label>
      ))}

      <h3>Menu Items:</h3>
      <ul>
        <li>Pizza</li>
        <li>Pasta</li>
        <li>Salad</li>
        <li>Soup</li>
        <li>Sandwich</li>
        <li>Steak</li>
        <li>Fish</li>
      </ul>
    </div>
  );
}

export default Menu;
