import React, { useState } from 'react';
import './UploadRecipe.css'; // Your CSS file
import { database } from '../firebase'; // Import Firebase config
import { ref, set } from "firebase/database"; // For Realtime Database

function UploadRecipes() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeText, setRecipeText] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const recipeData = {
      name: recipeName,
      image: recipeImage.name, // Store the image name or URL later
      instructions: recipeText.name, // Store the instructions file name
    };

    // Store in Firebase Realtime Database
    const newRecipeRef = ref(database, 'recipes/' + recipeName);
    await set(newRecipeRef, recipeData);
    
    console.log('Recipe Submitted:', recipeData);
    // Clear input fields after submission
    setRecipeName('');
    setRecipeImage(null);
    setRecipeText(null);
  };

  return (
    <div className="upload-recipe-container">
      <h2>Upload Your Recipe</h2>
      <form className="upload-recipe-form" onSubmit={handleSubmit}>
        <label>Recipe Name</label>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name"
          required
        />

        <label>Recipe Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setRecipeImage(e.target.files[0])}
          required
        />

        <label>Recipe Instructions (.txt)</label>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => setRecipeText(e.target.files[0])}
          required
        />

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default UploadRecipes;
