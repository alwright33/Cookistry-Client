import { useState, useEffect } from "react";
import RecipeService from "../../Services/RecipeServices";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      if (!recipeId) {
        throw new Error("Invalid recipe ID.");
      }

      const recipeDetails = await RecipeService.getRecipeById(recipeId);
      const recipeIngredients = await RecipeService.getIngredientsByRecipeId(
        recipeId
      );
      const recipeSteps = await RecipeService.getStepsByRecipeId(recipeId);

      setRecipe(recipeDetails);
      setIngredients(recipeIngredients);
      setSteps(recipeSteps);
    };

    fetchRecipeData();
  }, [recipeId]);

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
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
    </div>
  );
};

export default RecipeDetails;
