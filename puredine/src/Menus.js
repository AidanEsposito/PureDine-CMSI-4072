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
    <div className="menu-container">


      <h2>Menu for Restaurant: {restaurantId}</h2>

      <h3>Menu Items:</h3>
      <ul className="menu-items">
        <li>Pizza</li>
        <li>Pasta</li>
        <li>Salad</li>
        <li>Soup</li>
        <li>Sandwich</li>
        <li>Steak</li>
        <li>Fish</li>
        <li>Grilled Salmon</li>
      </ul>

      <h3>Allergy Filters:</h3>
      <div className="allergy-filters">
        {allergies.map((allergy) => (
          <label key={allergy}>
            <input
              type="checkbox"
              value={allergy}
              checked={selectedAllergies.includes(allergy)}
              onChange={() => toggleAllergy(allergy)}
            />
            {allergy}
          </label>
        ))}
      </div>

    </div>
  );
}

export default Menu;
