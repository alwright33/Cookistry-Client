const BASE_URL = "/api/Recipes";

const RecipeService = {
  // Fetch all recipes
  getAllRecipes: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  },

  // Fetch recipes by difficulty
  getRecipesByDifficulty: async (difficulty) => {
    const response = await fetch(`${BASE_URL}?difficulty=${difficulty}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  },

  getIngredientsByRecipeId: async (recipeId) => {
    const response = await fetch(
      `http://localhost:5122/api/RecipeIngredients/recipe/${recipeId}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching ingredients: ${response.statusText}`);
    }
    return await response.json();
  },

  // Fetch steps for a recipe
  getStepsByRecipeId: async (recipeId) => {
    const response = await fetch(
      `http://localhost:5122/api/RecipeSteps/recipe/${recipeId}`
    );
    return await response.json();
  },

  // Fetch a single recipe by ID
  getRecipeById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching recipe with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new recipe
  createRecipe: async (recipeData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  },

  // Save a recipe for the current user
  saveRecipe: async (userId, recipeId) => {
    try {
      const response = await fetch(
        `http://localhost:5122/api/SavedRecipes/user/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recipeId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw error;
    }
  },

  // Update a recipe
  updateRecipe: async (id, recipeData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating recipe with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a recipe
  deleteRecipe: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting recipe with ID ${id}:`, error);
      throw error;
    }
  },
};

export default RecipeService;
