import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage";
import { LoginUser } from "./components/LoginUser";
import { RegisterUser } from "./components/RegisterUser";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/login" element={<LoginUser />} />
      <Route path="/users/register" element={<RegisterUser />} />
    </Routes>
  );
};
