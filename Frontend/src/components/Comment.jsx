import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Comment = ({ comment, handleDeleteComment, handleEditComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.description);
  const [errorMessage, setErrorMessage] = useState("");
  const { auth } = useContext(AuthContext);

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setErrorMessage(""); // Limpiamos el mensaje de error al iniciar la edición
  };

  const handleSaveButtonClick = () => {
    // verificamos que el campo este vacio antes de guardarlo
    if (!editedComment.trim()) {
      setErrorMessage(
        "No puedes dejar este campo vacío. Si quieres, puedes eliminar el post."
      );
      return;
    }

    // Lógica para guardar el comentario editado
    handleEditComment(comment._id, editedComment);
    setIsEditing(false);
  };
  const handleCancelButtonClick = () => {
    // Cancelar la edición y restaurar el comentario original
    setEditedComment(comment.description);
    setIsEditing(false);
    setErrorMessage(""); // Limpiar el mensaje de error al cancelar la edición
  };

  const handleDeleteButtonClick = () => {
    // Mostrar el mensaje de confirmación con SweetAlert2
    Swal.fire({
      title: "¿Seguro que quieres eliminar este comentario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar el comentario
        handleDeleteComment(comment._id);
      }
    });
  };

  return (
    <div className="flex flex-col text-gray-400 relative mt-4">
      <div className="flex items-center mb-1">
        {comment?.author && (
          <img
            src={comment.author.avatarURL}
            alt={`Avatar de ${comment.author.username}`}
            className="w-6 h-6 rounded-full mr-2"
          />
        )}
        <span className="font-semibold">
          {comment?.author ? comment.author.username : "Usuario Desconocido"}
        </span>
        {comment?.author?._id === (auth?.user?._id || null) && (
          <>
            <button
              onClick={handleDeleteButtonClick}
              className="text-red-500 font-semibold ml-2"
            >
              Eliminar
            </button>
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelButtonClick}
                  className="text-gray-500 font-semibold ml-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveButtonClick}
                  className="text-blue-500 font-semibold ml-2"
                >
                  Guardar
                </button>
              </>
            ) : (
              <button
                onClick={handleEditButtonClick}
                className="text-blue-500 font-semibold ml-2"
              >
                Editar
              </button>
            )}
          </>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSaveButtonClick}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      ) : (
        <span>{comment?.description}</span>
      )}
    </div>
  );
};

export default Comment;
