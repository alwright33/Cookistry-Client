const BASE_URL = "/api/Ingredients";

const IngredientService = {
  getAllIngredients: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`Error fetching ingredients: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      throw error;
    }
  },
};

export default IngredientService;
