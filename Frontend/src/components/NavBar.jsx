import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          ViajesS.A
        </Link>
        {auth ? (
          <div className="flex space-x-4 items-center">
            <span className="text-gray-300 mr-4">
              ¡Hola, {auth.user.username}!
            </span>
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              to={"users/login"}
              className="hover:text-gray-300 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/users/register"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Registro
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
