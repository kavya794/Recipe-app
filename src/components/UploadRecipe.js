import React, { useState } from 'react';
import { storage, firestore } from '../firebase'; // Import firestore as well
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import getDownloadURL
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import './UploadRecipe.css';

function UploadRecipes() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeText, setRecipeText] = useState(null);
  const [keyIngredients, setKeyIngredients] = useState('');
 const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageRef = ref(storage, `images/${recipeImage.name}`);
      await uploadBytes(imageRef, recipeImage);
      const imageUrl = await getDownloadURL(imageRef);     
      const textRef = ref(storage, `texts/${recipeText.name}`);
      await uploadBytes(textRef, recipeText);       
      const textUrl = await getDownloadURL(textRef);    
      const recipeData = {
        name: recipeName,
        image: imageUrl,
        instructions: textUrl,
        keyIngredients: keyIngredients.split(',').map(ingredient => ingredient.trim()), 
        comments: {}, 
      };

      const recipeDocRef = doc(firestore, 'recipes', recipeName); // Use recipe name as document ID
      await setDoc(recipeDocRef, recipeData);

      console.log('Recipe Submitted:', recipeData);
      setRecipeName('');
      setRecipeImage(null);
      setRecipeText(null);
      setKeyIngredients('');
      alert("Recipe submission successfull")
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed, please try again.'); // Set error message if upload fails
    }
  };

  return (
    <div className="upload-recipe-container">
      {error && <p className="error-message">{error}</p>}
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

        <label>Key Ingredients (comma-separated)</label>
        <input
          type="text"
          value={keyIngredients}
          onChange={(e) => setKeyIngredients(e.target.value)}
          placeholder="Enter key ingredients"
          required
        />

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default UploadRecipes;
