import React, { useState, useEffect } from "react";
import "./Menus.css";

// Sample menu items and allergy options
const menuItems = [
  "Cheese Pizza",
  "Chicken Nuggets",
  "Shrimp Scampi",
  "Peanut Butter Sandwich",
  "Veggie Burger",
  "Caesar Salad",
  "Mushroom Soup",
  "Tofu Stir Fry",
  "Egg Salad",
  "Fish Tacos",
  "Breadsticks",
  "Chocolate Cake",
];


const allergyOptions = [
  "Dairy",
  "Gluten",
  "Peanuts",
  "Shellfish",
  "Soy",
  "Eggs",
  "Tree Nuts",
  "Fish",
];

const allergyKeywords = {
  Dairy: ["dairy", "milk", "cheese", "butter", "cream", "yogurt"],
  Gluten: ["gluten", "wheat", "barley", "rye", "malt"],
  Peanuts: ["peanut", "peanuts", "groundnut"],
  Shellfish: ["shrimp", "lobster", "crab", "shellfish"],
  Soy: ["soy", "soya", "soybean"],
  Eggs: ["egg", "eggs", "albumin"],
  "Tree Nuts": [
    "almond",
    "cashew",
    "walnut",
    "pecan",
    "hazelnut",
    "macadamia",
    "tree nut",
  ],
  Fish: ["fish", "salmon", "tuna", "cod", "trout", "anchovy"],
};

// Function to preprocess menu items and add allergen types
const preprocessMenuItem = (item) => {
  let updatedItem = item;

  //Currently, this function only adds the allergen type to the item name. Will be more dynamic in future iterations.

  if (item.toLowerCase().includes("pizza") || item.toLowerCase().includes("bread") || item.toLowerCase().includes("cake")) {
    updatedItem += " (wheat)";
  }
  if (item.toLowerCase().includes("cheese") || item.toLowerCase().includes("cream")) {
    updatedItem += " (dairy)";
  }
  if (item.toLowerCase().includes("peanut")) {
    updatedItem += " (peanuts)";
  }
  if (item.toLowerCase().includes("shrimp") || item.toLowerCase().includes("scampi")) {
    updatedItem += " (shellfish)";
  }
  if (item.toLowerCase().includes("tofu")) {
    updatedItem += " (soy)";
  }
  if (item.toLowerCase().includes("egg")) {
    updatedItem += " (eggs)";
  }
  if (item.toLowerCase().includes("fish")) {
    updatedItem += " (fish)";
  }
  if (item.toLowerCase().includes("nut") || item.toLowerCase().includes("almond")) {
    updatedItem += " (tree nuts)";
  }

  return updatedItem;
};


// Menus component to display menu items and allergy analysis
const Menus = () => {
  
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [analysisResults, setAnalysisResults] = useState({});

  
  const handleAllergyChange = (e) => {
    const allergy = e.target.value;
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
    );
  };

  
  useEffect(() => {
    if (selectedAllergies.length === 0) {
      setAnalysisResults({});
      return;
    }

    const analyzeMenu = () => {
      const analyzed = {};

      menuItems.forEach((item) => {
        let status = "safe"; // Default status is safe
        const processedItem = preprocessMenuItem(item).toLowerCase();
        
        selectedAllergies.forEach((allergy) => {
          const keywords = allergyKeywords[allergy];
          const allergyLower = allergy.toLowerCase();

          
          const hasAllergen = keywords.some((keyword) =>
            processedItem.includes(keyword)
          );
          if (hasAllergen) {
            status = "danger"; // If allergen found in item name, mark as "danger"
          } else if (processedItem.includes(allergyLower)) {
            status = "caution"; // If keyword found in item name, mark as "caution"
          }
        });

        analyzed[item] = status;
      });

      setAnalysisResults(analyzed);
    };

    analyzeMenu();
  }, [selectedAllergies]); 


  return (
    <div className="menus-container">
      <h2>Menus</h2>

      <div className="allergy-checkboxes">
        <h3>Select Allergies:</h3>
        {allergyOptions.map((allergy) => (
          <label key={allergy}>
            <input
              type="checkbox"
              value={allergy}
              checked={selectedAllergies.includes(allergy)}
              onChange={handleAllergyChange}
            />
            {allergy}
          </label>
        ))}
      </div>

      <ul className="menu-list">
        {menuItems.map((item) => {
          const status = analysisResults[item] || "safe";
          return (
            <li key={item} className={status}>
              {item} —{" "}
              {status === "danger"
                ? "⚠️ Dangerous"
                : status === "caution"
                ? "⚠️ Caution"
                : "✅ Safe"}
            </li>
          );
        })}
      </ul>
      <h5>Note: Do not fully rely on all estimations made by PureDine, website is still in development.</h5>
    </div>
  );
};

export default Menus;
