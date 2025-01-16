import { useState, useEffect } from "react";
import "./Recipe.css";
import { RecipeService } from "../../Services/RecipeSercives";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await RecipeService.getAllRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes. Please try again later.");
      }
    };

    fetchRecipes();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="recipes-container">
      <h1>Recipe List</h1>
      {recipes.length === 0 ? (
        <p>No recipes available.</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.recipeId} className="recipe-item">
              <h2>{recipe.name}</h2>
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Cook Time: {recipe.cookTime} mins</p>
              <p>Prep Time: {recipe.prepTime} mins</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recipes;
