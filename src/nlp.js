// src/nlp.js
import nlp from 'compromise';


export const analyzeRecipe = (recipes, searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    // Filter recipes based on the search term found in name, key ingredients, or comments
    const filteredRecipes = recipes.filter(recipe => {
        const { keyIngredients, name, comments } = recipe;
        const ingredientText = keyIngredients.join(' ');
        const commentText = Object.values(comments).join(' ');
        // Perform NLP processing
        const doc = nlp(ingredientText);
        const commentDoc = nlp(commentText);
        // Check if the search term is found in the name, ingredients, or comments
        return (
            name.toLowerCase().includes(lowerCaseTerm) ||
            doc.has(lowerCaseTerm) ||
            commentDoc.has(lowerCaseTerm)
        );
    });
    // Sort the filtered recipes by rating in descending order
    return filteredRecipes.sort((a, b) => (b.rating || 0) - (a.rating || 0));
};
