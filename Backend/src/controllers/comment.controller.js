import {CommentModel} from '../models/comment.model.js'
import {PostModel} from '../models/post.model.js'


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
      
      const comment = post.comments.id(commentId);

      // verificamos q el comentario exista
      if (!comment) {
        return res.status(404).json({ error: 'Comentario no encontrado.' });
    }
  
      // Verificar para saber si el usuario q intenta editar el comentario sea el propiertario
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