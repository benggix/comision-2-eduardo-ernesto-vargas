import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Comment = ({ comment, handleDeleteComment, handleEditComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.description);
  const { auth } = useContext(AuthContext);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    // Lógica para guardar el comentario editado
    handleEditComment(comment._id, editedComment);
    setIsEditing(false);
  };

  const handleCancelButtonClick = () => {
    // Cancelar la edición y restaurar el comentario original
    setEditedComment(comment.description);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col text-gray-400 relative mt-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
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
        </div>
        {comment?.author?._id === auth.user._id && (
          <div className="flex">
            <button
              onClick={() => handleDeleteComment(comment._id)}
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
          </div>
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
        </div>
      ) : (
        <span>{comment?.description}</span>
      )}
    </div>
  );
};

export default Comment;
