import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Import Firestore
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'; // Firestore functions
import { useParams } from 'react-router-dom'; // Import useParams
import StarRating from './StarRating'; // Import StarRating component
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams(); // Get recipe ID from URL parameters
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]); // Initialize comments as an empty array
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0); // State for the recipe rating

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(firestore, 'recipes', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const recipeData = docSnap.data();
        setRecipe(recipeData);
        setComments(Array.isArray(recipeData.comments) ? recipeData.comments : []); // Ensure comments is an array
        setRating(recipeData.rating || 0); // Initialize rating from Firestore
      } else {
        console.log('No such document!');
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    // Update Firestore with the new comment
    const docRef = doc(firestore, 'recipes', id);
    await updateDoc(docRef, {
      comments: arrayUnion(newComment), // Add new comment to the comments array
    });

    // Update local state
    setComments([...comments, newComment]);
    setNewComment('');
  };

  const handleRatingUpdate = async (newRating) => {
    setRating(newRating);

    // Update Firestore with the new rating
    const docRef = doc(firestore, 'recipes', id);
    await updateDoc(docRef, {
      rating: newRating,
    });
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="tile-container">
      <div className="recipe-tile">
        <h2>{recipe.name}</h2>
        <img src={recipe.image} alt={recipe.name} className="recipe-image" />
        <p><strong>Key Ingredient:</strong> {recipe.keyIngredients.join(', ')}</p>
        <a href={recipe.instructions} download>
          <button className="download-button">Download Instructions</button>
        </a>

        {/* Display the current rating */}
        <div className="rating-display">
          <h3>Current Rating: {rating}</h3>
          <StarRating 
            recipeId={id} 
            initialRating={rating} 
            onRatingUpdate={handleRatingUpdate} 
            readOnly={false} // Allow rating
          />
        </div>
        
        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>
        <button className="close-button" onClick={() => window.history.back()}>Close</button>
      </div>
    </div>
  );
}

export default RecipeDetails;
