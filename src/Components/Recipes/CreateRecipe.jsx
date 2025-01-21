import { useEffect, useState } from "react";
import RecipeService from "../../Services/RecipeServices";
import "./CreateRecipe.css";
import IngredientService from "../../Services/IngredientServices";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cookTime: "",
    prepTime: "",
    difficulty: "Beginner",
  });
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [ingredientModalOpen, setIngredientModalOpen] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientDetails, setIngredientDetails] = useState({
    quantity: "",
    unit: "",
    prepDetails: "",
  });
  const [newStep, setNewStep] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredients = await IngredientService.getAllIngredients();
        setAvailableIngredients(ingredients);
      } catch (err) {
        console.error("Error fetching ingredients:", err);
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleAddIngredientDetails = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      {
        ...selectedIngredient,
        ...ingredientDetails,
      },
    ]);
    setSelectedIngredient(null);
    setIngredientDetails({ quantity: "", unit: "", prepDetails: "" });
    setIngredientModalOpen(false);
  };

  const handleAddStep = () => {
    setSteps((prevSteps) => [...prevSteps, newStep]);
    setNewStep("");
  };

  const closeIngredientModal = () => {
    setIngredientModalOpen(false);
    setSelectedIngredient(null);
    setIngredientDetails({ quantity: "", unit: "", prepDetails: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("cookistry_user"));
      if (!user || !user.userId) {
        throw new Error("Unauthorized: User ID is missing.");
      }

      if (ingredients.length === 0) {
        alert("Please add at least one ingredient.");
        return;
      }

      if (steps.length === 0) {
        alert("Please add at least one step.");
        return;
      }

      const recipeData = {
        ...formData,
        cookTime: Number(formData.cookTime),
        prepTime: Number(formData.prepTime),
        ingredients: ingredients.map((ing) => ({
          ingredientId: ing.ingredientId,
          quantity: Number(ing.quantity),
          unit: ing.unit,
          prepDetails: ing.prepDetails,
        })),
        steps: steps.map((step, index) => ({
          stepNumber: index + 1,
          stepInstruction: step,
        })),
      };
      console.log("Submitting recipe data:", recipeData);

      await RecipeService.createRecipe(recipeData, user.userId);
      alert("Recipe created successfully!");
      setFormData({
        name: "",
        description: "",
        cookTime: "",
        prepTime: "",
        difficulty: "Beginner",
      });
      setIngredients([]);
      setSteps([]);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="create-recipe-container">
      <h1>Create a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cook Time (mins):</label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time (mins):</label>
          <input
            type="number"
            id="prepTime"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Ingredients Section */}
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <button
            type="button"
            className="add-button"
            onClick={() => setIngredientModalOpen(true)}
          >
            Add Ingredient
          </button>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity} {ingredient.unit} (
                {ingredient.prepDetails})
              </li>
            ))}
          </ul>
        </div>

        {/* Steps Section */}
        <div className="steps-section">
          <h2>Steps</h2>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>
                Step {index + 1}: {step}
              </li>
            ))}
          </ul>
          <div className="form-group">
            <label htmlFor="newStep">Add Step:</label>
            <textarea
              id="newStep"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
            />
            <button
              type="button"
              className="add-button"
              onClick={handleAddStep}
            >
              Add Step
            </button>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit Recipe
        </button>
      </form>

      {/* Modal for Adding Ingredients */}
      {ingredientModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Ingredient</h2>
            {!selectedIngredient && (
              <div className="ingredient-grid">
                {availableIngredients.map((ingredient) => (
                  <div
                    key={ingredient.ingredientId}
                    className="ingredient-item"
                    onClick={() => handleSelectIngredient(ingredient)}
                  >
                    {ingredient.name}
                  </div>
                ))}
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeIngredientModal}
                >
                  Cancel
                </button>
              </div>
            )}
            {selectedIngredient && (
              <>
                <h3>Selected: {selectedIngredient.name}</h3>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={ingredientDetails.quantity}
                    onChange={(e) =>
                      setIngredientDetails((prev) => ({
                        ...prev,
                        quantity: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="unit">Unit:</label>
                  <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={ingredientDetails.unit}
                    onChange={(e) =>
                      setIngredientDetails((prev) => ({
                        ...prev,
                        unit: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="prepDetails">Prep Details:</label>
                  <input
                    type="text"
                    id="prepDetails"
                    name="prepDetails"
                    value={ingredientDetails.prepDetails}
                    onChange={(e) =>
                      setIngredientDetails((prev) => ({
                        ...prev,
                        prepDetails: e.target.value,
                      }))
                    }
                  />
                </div>
                <button
                  type="button"
                  className="submit-button"
                  onClick={handleAddIngredientDetails}
                >
                  Add Ingredient
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeIngredientModal}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRecipe;
