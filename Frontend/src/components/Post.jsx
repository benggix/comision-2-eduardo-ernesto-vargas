import { useState, useEffect, useContext } from "react";
import { API_URL } from "../services/Api.Url";
import { AuthContext } from "../providers/AuthProvider";
import Comment from "../components/Comment";

export const Post = () => {
  // Estado para almacenar los posts
  const [posts, setPosts] = useState([]);
  const [commentFormsVisibility, setCommentFormsVisibility] = useState({});
  const [commentText, setCommentText] = useState("");
  const { auth } = useContext(AuthContext);

  // Efecto para cargar los posts al montar el componente

  // Función asincrónica para realizar la solicitud de los posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (response.status !== 200) {
        throw new Error("Hubo un error al obtener los posts");
      }

      const data = await response.json();
      setPosts(data);

      // Inicializar estados de visibilidad de los formularios de comentarios
      const initialVisibility = data.reduce(
        (acc, post) => ({
          ...acc,
          [post._id]: false,
        }),
        {}
      );
      setCommentFormsVisibility(initialVisibility);
    } catch (error) {
      console.error("Hubo un error al cargar los posts:", error);
    }
  };

  // Efecto para cargar los posts al montar el componente
  useEffect(() => {
    // Llamada a la función para cargar los posts
    fetchPosts();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  const toggleCommentForm = (postId) => {
    setCommentFormsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

  const handleCommentSubmit = async (postId) => {
    try {
      // Validar si el comentario está vacío
      if (!commentText.trim()) {
        console.error("El comentario no puede estar vacío");
        return;
      }

      // Crear objeto de comentario
      const newComment = {
        description: commentText,
      };

      // Realizar solicitud para agregar el comentario al post
      const response = await fetch(`${API_URL}/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // Incluir el token de autenticación si es necesario
        },
        body: JSON.stringify(newComment),
      });

      if (response.status !== 201) {
        console.error("Error al enviar el comentario");
        return;
      }

      // Restablecer el estado después de enviar el comentario
      setCommentText("");
      toggleCommentForm(postId);
      // Volver a cargar los posts después de enviar el comentario
      fetchPosts();
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Realizar solicitud para eliminar el comentario
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`, // Incluir el token de autenticación si es necesario
        },
      });

      if (response.status === 200) {
        console.log("Comentario eliminado con éxito");

        // Volver a cargar los posts después de eliminar el comentario
        fetchPosts();
      } else {
        console.error("Error al eliminar el comentario");
      }
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  const handleEditComment = async (commentId, updatedDescription) => {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ description: updatedDescription }),
      });

      if (response.status === 200) {
        console.log("Comentario editado con éxito");
        fetchPosts();
      } else {
        console.error("Error al editar el comentario");
      }
    } catch (error) {
      console.error("Error al editar el comentario:", error);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Seccion de titulo del post, avatar del autor del post, descripcion del post, username del autor del post y imagen del post */}
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-purple-900 p-4 rounded-md shadow-md mb-4 relative"
          >
            <div className="mb-4 border-b border-gray-600">
              {post.author && (
                <div className="flex items-center mb-2">
                  <img
                    src={post.author.avatarURL}
                    alt={`Imagen de ${post.author.username}`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-sm text-gray-300">
                      {post.author.username}
                    </p>
                  </div>
                </div>
              )}
              <div>
                <h1 className="text-lg font-bold mb-2 text-white">
                  Title: {post.title}
                </h1>
                <p className="text-gray-200">Description: {post.description}</p>
              </div>
            </div>

            {post.imageURL && (
              <img
                src={post.imageURL}
                alt={`Imagen de ${post.title}`}
                className="w-full h-48 object-cover mb-4 rounded-md border-b border-gray-600"
              />
            )}

            {/* Seccion Comentarios, autor del comentario, avatar del creador del comentario y username del creador del comentario */}
            <div className="mt-4 border-b border-gray-600">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Comentarios
              </h3>
              <ul>
                {post.comments &&
                  post.comments.map((comment, index) => (
                    <Comment
                      key={comment?._id || index}
                      comment={comment}
                      handleDeleteComment={handleDeleteComment}
                      handleEditComment={handleEditComment}
                    />
                  ))}
              </ul>
            </div>

            {/* Botón para expandir/retraer el formulario de comentarios */}
            {auth && (
              <button
                className="text-blue-500 font-semibold mt-2"
                onClick={() => toggleCommentForm(post._id)}
              >
                Comentar
              </button>
            )}

            {/* Entrada para comentar */}
            {commentFormsVisibility[post._id] && (
              <div className="mt-4">
                <textarea
                  placeholder="Escribe tu comentario..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => handleCommentSubmit(post._id)}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Enviar comentario
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
