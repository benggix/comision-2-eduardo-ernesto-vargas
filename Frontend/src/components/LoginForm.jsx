import { Link, useNavigate } from "react-router-dom";
import {API_URL} from "../services/Api.Url"
import { useContext, useRef } from "react";
import { AuthContext } from "../providers/AuthProvider";

const LoginForm = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      username,
      password,
    };

    const req = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status != 200) return console.error("Error al iniciar sesion"); // manejo de error

    const res = await req.json();
    login(res);


    navigate('/');
    ref.current.reset();
  };
  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 min-h-screen flex items-center justify-center">
      <Link
        to="/"
        className="absolute 
              top-4 
              left-4 
              text-white 
              font-bold 
              text-xl 
              bg-red-500 
              rounded-medium 
              py-2 
              px-4
              shadow-sm"
      >
        Volver
      </Link>
      <form
        onSubmit={handleSubmit} ref={ref}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Usuario:
          </label>
          <input
            type="text"
            name="username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Iniciar Sesión
        </button>

        <div className="mt-4 text-black">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/users/register"
            className="text-red-600 hover:underline dark:text-blue-500"
          >
            Registrarme!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
