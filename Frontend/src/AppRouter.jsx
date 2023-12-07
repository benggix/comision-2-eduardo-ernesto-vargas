import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage";
import { RegisterPage } from "./views/RegisterPage";
import { LoginPage } from "./views/LoginPage";
import { PostPage } from "./views/PostPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/login" element={<LoginPage />} />
      <Route path="/users/register" element={<RegisterPage/>} />


      <Route path="/posts" element={<PostPage/>} />
    </Routes>
  );
};
