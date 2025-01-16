import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "../Components/Nav/NavBar";
import Home from "../Components/Home";
import Recipes from "../Components/Recipes/Recipe";
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
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
        </Route>
      </Routes>
    </>
  );
};

export default ApplicationViews;
