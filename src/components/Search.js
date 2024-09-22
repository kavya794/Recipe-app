import React, { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const recipes = ["Spaghetti", "Tacos", "Sushi", "Pasta", "Pizza"];

    const filteredRecipes = recipes.filter(recipe =>
        recipe.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search for a recipe..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredRecipes.map((recipe, index) => (
                    <li key={index}>{recipe}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
