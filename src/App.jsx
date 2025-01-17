import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Auth/Login";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./Views/ApplicationViews";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
};

export default App;
