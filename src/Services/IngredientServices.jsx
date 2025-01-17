const BASE_URL = "/api/Ingredients"; // Replace with your backend base URL

const IngredientService = {
  // Existing methods...

  getAllIngredients: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`Error fetching ingredients: ${response.statusText}`);
      }
      return await response.json(); // Return the list of ingredients
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      throw error; // Rethrow for handling in the component
    }
  },
};

export default IngredientService;
