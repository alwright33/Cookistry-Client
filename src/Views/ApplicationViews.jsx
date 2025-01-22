import NavBar from "../Components/Nav/NavBar";
import Home from "../Components/Home";
import Recipe from "../Components/Recipes/Recipe";
import RecipeDetails from "../Components/Recipes/RecipeDetails";
import SavedRecipes from "../Components/Recipes/SavedRecipes";
import CreateRecipe from "../Components/Recipes/CreateRecipe";
import { Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateRecipe from "../Components/Recipes/UpdateRecipe";

export const ApplicationViews = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCookistryUser = localStorage.getItem("cookistry_user");
    if (localCookistryUser) {
      const userObject = JSON.parse(localCookistryUser);
      setCurrentUser(userObject);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cookistry_user");
    setCurrentUser({});
    navigate("/login");
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route
            path="/recipes/:recipeId"
            element={
              <RecipeDetails
                isSavedRecipe={window.location.search.includes("saved=true")}
              />
            }
          />
          <Route path="/new-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/recipes/:update/:recipeId" element={<UpdateRecipe />} />
        </Route>
      </Routes>
    </>
  );
};
