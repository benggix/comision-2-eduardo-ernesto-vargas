import { Link } from "react-router-dom";

const LoginUser = () => {
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
      <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h1>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
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
      </form>
    </div>
  );
};

export default LoginUser;
