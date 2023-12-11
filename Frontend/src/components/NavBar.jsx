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

            <Link className="hover:text-gray-300 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              to="/posts/createPost"
            >
              Crear Post
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              // Si usamos asi, lo q hace es q se mantiene la url donde estas vos y se agrega el users/login, x ejemplo si estoy en http://localhost:5173/posts y tengo esto: to={"users/login"}, me va a mandar a "http://localhost:5173/posts/users/login" y esa no es la direccion
              to="/users/login" // si usamos el to sin llaves, lo q hace es q me manda a una nueva direccion sin importar en donde estaba parado
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
