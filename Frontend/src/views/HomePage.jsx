import { NavBar } from "../components/NavBar";
import { MainContent } from "../components/MainContent";

export const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-blue-600">
      <NavBar />
      <MainContent />
    </div>
  );
};
