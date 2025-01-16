import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeService from "../../Services/RecipeServices";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState(""); // Success or error message

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipeData = await RecipeService.getRecipeById(recipeId);
        setRecipe(recipeData);

        const ingredientsData = await RecipeService.getIngredientsByRecipeId(
          recipeId
        );
        setIngredients(ingredientsData);

        const stepsData = await RecipeService.getStepsByRecipeId(recipeId);
        setSteps(stepsData);
      } catch (err) {
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
      setSaveMessage("Recipe saved successfully!");
    } catch (err) {
      setSaveMessage(`Failed to save recipe: ${err.message}`);
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
            <button onClick={handleSaveRecipe}>Save Recipe</button>
          </div>
          <p>
            <strong>Cook Time:</strong> {recipe.cookTime} mins
          </p>
        </div>
      </div>

      {saveMessage && <p>{saveMessage}</p>}

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
