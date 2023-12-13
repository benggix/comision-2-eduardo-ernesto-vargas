import { useState, useEffect, useContext } from "react";
import { API_URL } from "../services/Api.Url";
import { AuthContext } from "../providers/AuthProvider";
import Comment from "../components/Comment";
import Swal from "sweetalert2";

export const Post = () => {
  // Estado para almacenar los posts, visibilidad de los comments y edit post
  const [posts, setPosts] = useState([]);
  const [commentFormsVisibility, setCommentFormsVisibility] = useState({});
  const [commentText, setCommentText] = useState("");
  const { auth } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [editedPostId, setEditedPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImageURL, setEditedImageURL] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const closeGallery = () => {
    setCurrentImageIndex(null);
    setIsGalleryOpen(false);
  };

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

  const handleDeletePost = (postId) => {
    // Mostramos la alerta inmediatamente al hacer clic en "Eliminar Post"
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este Post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Confirmación confirmada, eliminar el post
        handleConfirmDeletePost(postId);
      }
    });
  };

  const handleConfirmDeletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.status === 200) {
        console.log("Publicación eliminada con éxito");
        fetchPosts();
      } else {
        console.error("Error al eliminar la publicación");
      }
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    if (postToEdit) {
      setEditMode(true);
      setEditedPostId(postId);
      setEditedTitle(postToEdit.title);
      setEditedDescription(postToEdit.description);
      setEditedImageURL(postToEdit.imageURL || "");
    }
  };

  const handleSaveEdit = async (postId) => {
    try {
      // Reiniciar errores
      setFormErrors({});

      // Verificar si el título, la descripción y la URL de la imagen no están vacíos
      if (!editedTitle.trim()) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          title: "Por favor, completa el título.",
        }));
        return;
      }

      if (!editedDescription.trim()) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          description: "Por favor, completa la descripción.",
        }));
        return;
      }

      if (!editedImageURL.trim()) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          imageURL: "Por favor, completa la URL de la imagen.",
        }));
        return;
      }

      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          imageURL: editedImageURL,
        }),
      });

      if (response.status === 200) {
        console.log("Publicación editada con éxito");
        fetchPosts();
        // Salir del modo de edición después de guardar
        setEditMode(false);
        setEditedPostId(null);
      } else {
        console.error("Error al editar la publicación");
      }
    } catch (error) {
      console.error("Error al editar la publicación:", error);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="max-w-2xl mx-auto mt-8 flex flex-col">
        {/* Seccion de titulo del post, avatar del autor del post, descripcion del post, username del autor del post y imagen del post */}
        {posts.map((post, index) => (
          <div
            key={post._id}
            className="bg-gray-900 p-4 rounded-md shadow-md mb-4 relative flex flex-col"
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
                    {auth && auth.user && auth.user._id === post.author._id && (
                      <div className="flex">
                        <button
                          className="text-red-500 font-semibold mr-4"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Eliminar Post
                        </button>

                        <button
                          className="text-blue-500 font-semibold"
                          onClick={() => handleEditPost(post._id)}
                        >
                          Editar Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {editMode && post._id === editedPostId && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Nuevo título"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  {formErrors.title && (
                    <p className="text-red-500">{formErrors.title}</p>
                  )}

                  <textarea
                    placeholder="Nueva descripción"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  {formErrors.description && (
                    <p className="text-red-500">{formErrors.description}</p>
                  )}

                  <input
                    type="text"
                    placeholder="Nueva URL de imagen"
                    value={editedImageURL}
                    onChange={(e) => setEditedImageURL(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  {formErrors.imageURL && (
                    <p className="text-red-500">{formErrors.imageURL}</p>
                  )}

                  <div className="flex">
                    <button
                      onClick={() => handleSaveEdit(post._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Guardar Edición
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedPostId(null);
                        // También podrías restablecer los valores editados si lo deseas
                      }}
                      className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
              <div className="font-bold">
                <h1 className=" text-pink-500 mb-2">
                  Title:{" "}
                  <span className="text-white truncate">{post.title}</span>
                </h1>
                <div className="text-pink-500">
                  <p className="whitespace-normal">
                    Description:{" "}
                    <span className="text-white ">{post.description}</span>
                  </p>
                </div>
              </div>
            </div>

            {post.imageURL && (
              <img
                src={post.imageURL}
                alt={`Imagen de ${post.title}`}
                className="w-full h-48 object-cover mb-4 rounded-md border-b border-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic llegue al contenedor principal
                  setCurrentImageIndex(index);
                  setIsGalleryOpen(true);
                }}
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

            {isGalleryOpen && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
                onClick={closeGallery}
              >
                <button
                  className="text-white absolute top-4 right-4"
                  onClick={closeGallery}
                >
                  Cerrar
                </button>
                <img
                  src={posts[currentImageIndex]?.imageURL}
                  alt={`Imagen de ${posts[currentImageIndex]?.title}`}
                  className="max-w-full max-h-full"
                  onClick={(e) => e.stopPropagation()} // Evita que el clic llegue al contenedor principal
                />
              </div>
            )}

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
