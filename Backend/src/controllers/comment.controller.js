import {CommentPost} from '../models/comment.model'
import {PostModel} from '../models/post.model'


// Controlador para la creación de comentarios
const createComment = async (req, res) => {
    try {
      const { description } = req.body;
      const author = req.user; // Obtener el usuario autenticado desde el middleware de autenticación
      const postId = req.params.postId;
  
      const post = await PostModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Publicación no encontrada.' });
      }
  
      const newComment = new CommentPost({
        description,
        author,
      });
  
      post.comments.push(newComment);
      await post.save();
      res.status(201).json({ message: 'Comentario creado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el comentario.' });
    }
  };
  
  // Controlador para la eliminación de comentarios
  const deleteComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const post = await PostModel.findOne({ 'comments._id': commentId });
  
      if (!post) {
        return res.status(404).json({ error: 'Comentario no encontrado.' });
      }
  
      // Verificar que el usuario que solicita la eliminación sea el autor del comentario
      const comment = PostModel.comments.id(commentId);
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para eliminar este comentario.' });
      }
  
      comment.remove();
      await post.save();
      res.status(200).json({ message: 'Comentario eliminado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el comentario.' });
    }
  };

  
  
  // Controlador para la edición de comentarios (puedes adaptarlo según tus necesidades)
  const editComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { description } = req.body;
  
      const post = await PostModel.findOne({ 'comments._id': commentId });
  
      if (!post) {
        return res.status(404).json({ error: 'Comentario no encontrado.' });
      }
  
      const comment = post.comments.id(commentId);
  
      // Verificar que el usuario que solicita la edición sea el autor del comentario
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para editar este comentario.' });
      }
  
      comment.description = description;
  
      await post.save();
      res.status(200).json({ message: 'Comentario editado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al editar el comentario.' });
    }
  };


  export {
    createComment,
    deleteComment,
    editComment,
}