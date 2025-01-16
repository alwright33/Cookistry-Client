import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "../Components/Nav/NavBar";
import Home from "../Components/Home";
import Recipe from "../Components/Recipes/Recipe";
import RecipeDetails from "../Components/Recipes/RecipeDetails";
import { useState, useEffect } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCookistryUser = localStorage.getItem("cookistry_user");
    if (localCookistryUser) {
      const userObject = JSON.parse(localCookistryUser);
      setCurrentUser(userObject);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
            </>
          }
        >
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Recipes List Page */}
          <Route path="/recipes" element={<Recipe />} />

          {/* Recipe Details Page */}
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        </Route>
      </Routes>
    </>
  );
};
