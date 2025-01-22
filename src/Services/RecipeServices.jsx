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

  // Fetch saved recipes for a user
  getSavedRecipes: async (userId) => {
    const response = await fetch(
      `http://localhost:5122/api/SavedRecipes/user/${userId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch saved recipes.");
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
  createRecipe: async (recipeData, userId) => {
    const response = await fetch(
      `http://localhost:5122/api/Recipes?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create recipe");
    }

    return await response.json();
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
      const response = await fetch(`http://localhost:5122/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Error: ${response.status} ${response.statusText}`
        );
      }

      // Handle no content responses (204)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating recipe with ID ${id}:`, error);
      throw error;
    }
  },
  removeSavedRecipe: async (userId, recipeId) => {
    const response = await fetch(
      `http://localhost:5122/api/SavedRecipes/user/${userId}/recipe/${recipeId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove saved recipe.");
    }
  },

  // Delete a recipe
  deleteRecipe: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Error: ${response.status} ${response.statusText}`
        );
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`Error deleting recipe with ID ${id}:`, error);
      throw error;
    }
  },
};

export default RecipeService;
