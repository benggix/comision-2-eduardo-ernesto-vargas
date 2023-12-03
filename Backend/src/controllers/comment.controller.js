import { CommentModel } from '../models/comment.model.js'
import { PostModel } from '../models/post.model.js'


// Controlador para obtener todos los comentarios de un post
const ctrlGetCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Encuentra todos los comentarios asociados al postId
    const comments = await CommentModel.find({ postId }).populate('author');

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener comentarios.' });
  }
};


// Controlador para la creación de comentarios
const ctrlCreateComment = async (req, res) => {
  try {
    const { description } = req.body;
    const author = req.user; // Obtener el usuario autenticado desde el middleware de autenticación
    const postId = req.params.postId;

    const post = await PostModel.findById(postId);

    // Verificamos q el post en cual queremos comentar exista
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }

    const newComment = new CommentModel({
      description,
      author,
    });

    await newComment.save(); // nos aseguramos de guardar los comentarios cuando lo creamos

    post.comments.push(newComment._id); // Luego, agrega el _id del comentario al array comments de la publicación
    await post.save();                  // Finalmente, guarda la publicación
    res.status(201).json({ message: 'Comentario creado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el comentario.' });
  }
};

// Controlador para la eliminación de comentarios
const ctrlDeleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Encuentra el comentario
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }

    // Verificar que el usuario que solicita la eliminación sea el autor del comentario
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar este comentario.' });
    }

    // Eliminar el comentario después de la verificación
    await CommentModel.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comentario eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el comentario.' });
  }
};




// Controlador para la edición de comentarios (puedes adaptarlo según tus necesidades)
const ctrlEditComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { description } = req.body;

    // Encuentra y actualiza el comentario directamente
    const comment = await CommentModel.findById(commentId);

    // verificamos q el comentario exista
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }

    // Verificar para saber si el usuario q intenta editar el comentario sea el propiertario
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'No tienes permisos para editar este comentario.' });
    }

    comment.description = description;

    await comment.save();
    res.status(200).json({ message: 'Comentario editado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el comentario.' });
  }
};


export {
  ctrlCreateComment,
  ctrlDeleteComment,
  ctrlEditComment,
  ctrlGetCommentsForPost,
}