import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeService from "../../Services/RecipeServices";
import "./Recipe.css";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await RecipeService.getAllRecipes();
        setRecipes(data);
        setFilteredRecipes(data); // Initially show all recipes
      } catch (error) {
        setError("Failed to load recipes. Please try again later.");
      }
    };

    fetchRecipes();
  }, []);

  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setDifficulty(selectedDifficulty);

    if (selectedDifficulty === "All") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) => recipe.difficulty === selectedDifficulty
      );
      setFilteredRecipes(filtered);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <label htmlFor="difficulty-select" className="filter-label">
        Filter by Difficulty:
      </label>
      <select
        id="difficulty-select"
        value={difficulty}
        onChange={handleDifficultyChange}
        className="filter-select"
      >
        <option value="All">All</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.recipeId} className="recipe-item">
            <Link to={`/recipes/${recipe.recipeId}`} className="recipe-link">
              <h2>{recipe.name}</h2>
              <p>Difficulty: {recipe.difficulty}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
