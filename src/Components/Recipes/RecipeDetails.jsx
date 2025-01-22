import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeService from "../../Services/RecipeServices";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const userId = JSON.parse(localStorage.getItem("cookistry_user")).userId;
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchRecipeData = async () => {
      try {
        if (!recipeId) throw new Error("Invalid recipe ID.");

        const recipeDetails = await RecipeService.getRecipeById(recipeId);
        const recipeIngredients = await RecipeService.getIngredientsByRecipeId(
          recipeId
        );
        const recipeSteps = await RecipeService.getStepsByRecipeId(recipeId);

        if (isMounted) {
          setRecipe(recipeDetails);
          setIngredients(recipeIngredients);
          setSteps(recipeSteps);

          const savedRecipes = await RecipeService.getSavedRecipes(userId);
          setIsSaved(
            savedRecipes.some((r) => r.recipeId === parseInt(recipeId))
          );
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error fetching recipe with ID ${recipeId}:`, err);
          alert("Recipe not found or has been deleted.");
          navigate("/recipes"); // Redirect if recipe fetch fails
        }
      }
    };

    fetchRecipeData();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [recipeId, userId, navigate]);

  const handleSaveRecipe = async () => {
    try {
      await RecipeService.saveRecipe(userId, recipeId);
      setIsSaved(true);
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleDeleteSavedRecipe = async () => {
    try {
      await RecipeService.removeSavedRecipe(userId, recipeId);
      setIsSaved(false);
      alert("Recipe removed successfully!");
    } catch (error) {
      console.error("Error removing recipe:", error);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      await RecipeService.deleteRecipe(recipeId);
      alert("Recipe deleted successfully!");
      navigate("/recipes"); // Redirect to the recipes page after deletion
    } catch (err) {
      alert(`Error deleting recipe: ${err.message}`);
    }
  };

  const handleUpdateRecipe = () => {
    navigate(`/recipes/update/${recipeId}`, {
      state: { recipe, ingredients, steps },
    });
  };

  return (
    <div className="container">
      <div className="save-button-container">
        {isSaved ? (
          <button onClick={handleDeleteSavedRecipe}>Unsave Recipe</button>
        ) : (
          <button onClick={handleSaveRecipe}>Save Recipe</button>
        )}
      </div>
      {recipe && recipe.authorId === userId && (
        <div className="owner-actions">
          <button onClick={handleUpdateRecipe}>Update Recipe</button>
          <button onClick={handleDeleteRecipe}>Delete Recipe</button>
        </div>
      )}
      {recipe ? (
        <>
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
          <div className="recipe-info">
            <p>
              <strong>Cook Time:</strong> {recipe.cookTime} mins
            </p>
            <p>
              <strong>Prep Time:</strong> {recipe.prepTime} mins
            </p>
            <p>
              <strong>Difficulty:</strong> {recipe.difficulty}
            </p>
          </div>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.length > 0 ? (
              ingredients.map((ing, index) => (
                <li key={index}>{`${ing.quantity} ${ing.unit} ${ing.name}`}</li>
              ))
            ) : (
              <p>No ingredients available.</p>
            )}
          </ul>
          <h2>Steps</h2>
          <ol>
            {steps.length > 0 ? (
              steps.map((step, index) => (
                <li key={index}>{step.stepInstruction}</li>
              ))
            ) : (
              <p>No steps available.</p>
            )}
          </ol>
        </>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
