
import { Link, useNavigate } from "react-router-dom";
import {API_URL} from "../services/Api.Url"
import { useRef } from "react";


const RegisterUser = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // accedemos a los datos del form q el usuario envio y los guardamos
    const formData = new FormData(event.target); 

    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const avatar = formData.get("avatarURL");
    
    // guardamos los datos q ingreso el usuario del formulario en un obj
    const user = {
      username,
      password,
      email,
      avatar,
    };
    
    // traemos informacion del usuario, lo pasamos al body como format JSON
    const req = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(user), 
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Si no se cumple la condicion: error
    if (req.status != 201) return console.error("Hubo un error al registrar el usuario"); 
    
    // mandamos al usuario logeado hacia nuestro HomePage
    navigate("/users/login");
    // limpiamos los datos ingresados en el form
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
      <form  onSubmit={handleSubmit} ref={ref} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-bold text-center mb-8">Registrarse</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Usuario:
          </label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            avatarURL
          </label>
          <input
            type="url"
            name="avatarURL"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Registrarse!
        </button>
        
        <div className="mt-4 text-black">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/users/login"
            className="text-red-600 hover:underline dark:text-blue-500"
          >
            Iniciar Sesion!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
