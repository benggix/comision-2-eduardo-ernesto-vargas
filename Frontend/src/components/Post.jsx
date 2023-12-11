import { useState, useEffect, useContext } from "react";
import { API_URL } from "../services/Api.Url";
import { AuthContext } from "../providers/AuthProvider";

export const Post = () => {
  // Estado para almacenar los posts
  const [posts, setPosts] = useState([]);
  const [commentFormsVisibility, setCommentFormsVisibility] = useState({});
  const [commentText, setCommentText] = useState("");
  const { auth } = useContext(AuthContext);

  // Efecto para cargar los posts al montar el componente
  useEffect(() => {
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

    // Llamada a la función para cargar los posts
    fetchPosts();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  const toggleCommentForm = (postId) => {
    setCommentFormsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

  const handleCommentSubmit = (postId) => {
    // Lógica para enviar el comentario del post con el ID 'postId'
    console.log(`Comentario enviado para el post ${postId}:`, commentText);

    // Restablecer el estado después de enviar el comentario
    setCommentText("");
    toggleCommentForm(postId);
  };
  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="max-w-2xl mx-auto mt-8">

        {/* Seccion de titulo del post, avatar del autor del post, descripcion del post, username del autor del post y imagen del post */}
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-purple-700 p-4 rounded-md shadow-md mb-4"
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
                  post.comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="flex flex-col text-gray-400"
                    >
                      <div className="flex items-center mb-1">
                        {comment.author && (
                          <img
                            src={comment.author.avatarURL}
                            alt={`Avatar de ${comment.author.username}`}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        <span className="font-semibold">
                          {comment.author.username}
                        </span>
                      </div>
                      <span>{comment.description}</span>
                    </li>
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
