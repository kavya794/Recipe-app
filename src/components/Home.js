// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { analyzeRecipe } from '../nlp'; // Import the NLP analysis function
import './Home.css';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRecipes, setShowRecipes] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesCollection = collection(firestore, 'recipes');
            const recipeSnapshot = await getDocs(recipesCollection);
            const recipesList = recipeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(recipesList);
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = searchTerm
        ? analyzeRecipe(recipes, searchTerm)
        : recipes;

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
                <button onClick={() => setShowRecipes(!showRecipes)}>
                    {showRecipes ? 'Close' : 'Show Recipes'}
                </button>
            </div>
            {showRecipes && (
                <ul className="recipe-list">
                    {filteredRecipes.map(recipe => (
                        <li key={recipe.id} className="recipe-item">
                            <Link to={`/recipe/${recipe.id}`}>
                                {recipe.name} - Rating: {recipe.rating || 'N/A'}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;
