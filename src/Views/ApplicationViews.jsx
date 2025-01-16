import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Recipes from "../Components/Recipes/Recipe";
import Login from "../Components/Auth/Login";

const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default ApplicationViews;
