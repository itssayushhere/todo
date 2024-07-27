import { Route, Routes } from "react-router-dom";
import { Goals } from "../Pages/GoalsPage/Goals";
import { Welcome } from "../Pages/Welcome";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home/Home";
import User from "../Pages/User/User";
import { LoginProtected, ProtectedRoute } from "./ProtectedRoute";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <Goals />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/login"
        element={
          <LoginProtected>
            <Login />
          </LoginProtected>
        }
      />
      <Route path="/home" element={<Home />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute goto={"/user"}>
            <User />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
