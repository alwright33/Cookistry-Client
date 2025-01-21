import { useEffect, useState } from "react";
import RecipeService from "../../Services/RecipeServices";
import { Link } from "react-router-dom";
import "./Recipe.css";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("cookistry_user"));
      if (!user) throw new Error("User not logged in");

      const data = await RecipeService.getSavedRecipes(user.userId);
      setSavedRecipes(data);
      setFilteredRecipes(data);
    };

    fetchSavedRecipes();
  }, []);

  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setDifficulty(selectedDifficulty);

    if (selectedDifficulty === "All") {
      setFilteredRecipes(savedRecipes);
    } else {
      const filtered = savedRecipes.filter(
        (recipe) => recipe.difficulty === selectedDifficulty
      );
      setFilteredRecipes(filtered);
    }
  };

  if (savedRecipes.length === 0) {
    return <p>You do not have any saved recipes yet.</p>;
  }

  return (
    <div className="recipes-container">
      <h1>Your Saved Recipes</h1>
      <div className="filter-container">
        <label htmlFor="difficulty-select" className="filter-label">
          Filter:
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
      </div>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.recipeId} className="recipe-item">
            <Link
              to={`/recipes/${recipe.recipeId}?saved=true`}
              className="recipe-link"
            >
              <h2>{recipe.name}</h2>
            </Link>
            <p>Difficulty: {recipe.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;
