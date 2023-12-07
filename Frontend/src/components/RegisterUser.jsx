import React from "react";

export const RegisterUser = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 min-h-screen flex items-center justify-center">
      <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4">
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
      </form>
    </div>
  );
};
