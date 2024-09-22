import React, { useEffect, useState } from 'react';
import { database } from '../firebase'; // Import Firebase config
import { ref, onValue } from "firebase/database"; // For Realtime Database
import './Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const recipesRef = ref(database, 'recipes/');
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      const recipesList = [];
      for (let id in data) {
        recipesList.push({ id, ...data[id] });
      }
      setRecipes(recipesList);
    });
  }, []);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Welcome to the Recipe Sharing Platform!</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search recipes..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button>Search</button>
      </div>
      <ul className="recipe-list">
        {filteredRecipes.map(recipe => (
          <li 
            key={recipe.id} 
            className="recipe-item" 
            onClick={() => handleRecipeClick(recipe)}
          >
            {recipe.name}
          </li>
        ))}
      </ul>

      {selectedRecipe && (
        <div className="recipe-details">
          <button onClick={handleCloseDetails}>Close</button>
          <h2>{selectedRecipe.name}</h2>
          <img src={selectedRecipe.image} alt={selectedRecipe.name} />
          <p><strong>Instructions:</strong></p>
          <a href={selectedRecipe.instructions} download>
            Download Instructions
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
