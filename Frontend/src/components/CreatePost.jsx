import React, { useState, useContext } from "react";
import { API_URL } from "../services/Api.Url";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizamos la solicitud para crear un nuevo post
      const response = await fetch(`${API_URL}/posts/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log("Post creado con éxito");
        navigate("/posts");
      } else {
        console.error("Error al crear el post");
      }
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 min-h-screen flex items-center justify-center">
      <button
        onClick={handleGoBack}
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
      </button>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-medium text-center mb-8">
          Creando tu Post
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Descripción:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              URL de la Imagen:
            </label>
            <input
              type="url"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Crear Post
          </button>
        </form>
      </div>
    </div>
  );
};
