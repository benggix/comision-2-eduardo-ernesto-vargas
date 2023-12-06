import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
