import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeService from "../../Services/RecipeServices";
import "./RecipeDetail.css";

const RecipeDetail = ({ isSavedRecipe: initialIsSavedRecipe }) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSavedRecipe, setIsSavedRecipe] = useState(initialIsSavedRecipe);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        console.log("Fetching recipe details...");
        const recipeData = await RecipeService.getRecipeById(recipeId);
        console.log("Recipe data fetched:", recipeData);
        setRecipe(recipeData);

        console.log("Fetching ingredients...");
        const ingredientsData = await RecipeService.getIngredientsByRecipeId(
          recipeId
        );
        console.log("Ingredients data fetched:", ingredientsData);
        setIngredients(ingredientsData);

        console.log("Fetching steps...");
        const stepsData = await RecipeService.getStepsByRecipeId(recipeId);
        console.log("Steps data fetched:", stepsData);
        setSteps(stepsData);

        console.log("Checking if recipe is saved...");
        const user = JSON.parse(localStorage.getItem("cookistry_user"));
        if (!user) throw new Error("User not logged in");

        const savedRecipes = await RecipeService.getSavedRecipes(user.userId);
        console.log("Saved recipes fetched:", savedRecipes);
        const isSaved = savedRecipes.some(
          (savedRecipe) => savedRecipe.recipeId === parseInt(recipeId, 10)
        );
        console.log("Is recipe saved?", isSaved);
        setIsSavedRecipe(isSaved);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("Failed to load recipe details. Please try again.");
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handleSaveRecipe = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("cookistry_user"));
      if (!user) throw new Error("User not logged in");

      await RecipeService.saveRecipe(user.userId, recipeId);
      setMessage("Recipe saved successfully!");
      setIsSavedRecipe(true); // Update the state
    } catch (err) {
      setMessage(`Failed to save recipe: ${err.message}`);
    }
  };

  const handleRemoveRecipe = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("cookistry_user"));
      if (!user) throw new Error("User not logged in");

      await RecipeService.removeSavedRecipe(user.userId, recipeId);
      setMessage("Recipe removed successfully!");
      setIsSavedRecipe(false); // Update the state
    } catch (err) {
      setMessage(`Failed to remove recipe: ${err.message}`);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>

      <div className="recipe-info">
        <p>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </p>
        <p>
          <strong>Prep Time:</strong> {recipe.prepTime} mins
        </p>
        <div className="cooktime-section">
          <div className="save-button-container">
            {isSavedRecipe ? (
              <button onClick={handleRemoveRecipe}>Remove Recipe</button>
            ) : (
              <button onClick={handleSaveRecipe}>Save Recipe</button>
            )}
          </div>
          <p>
            <strong>Cook Time:</strong> {recipe.cookTime} mins
          </p>
        </div>
      </div>

      {message && <p>{message}</p>}

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.ingredientId}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      <h2>Steps</h2>
      <ol>
        {steps.map((step) => (
          <li key={step.stepId}>{step.stepInstruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
