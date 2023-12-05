import {PostModel} from '../models/post.model.js'



// Controlador para obtener todas las publicaciones
const ctrlGetPosts = async (req, res) => {
    try {
      const posts = await PostModel.find().populate('author', 'username avatarURL').populate({
        path: 'comments',
        populate: { path: 'author', select: 'username avatarURL' },
      });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las publicaciones.' });
    }
  };

// Controlador para la creación de publicaciones
const ctrlCreatePost = async (req, res) => {
    try {
      const { title, description, imageURL } = req.body;
      const author = req.user;          // Obtener el usuario autenticado desde el middleware de autenticación
  
      const newPost = new PostModel({
        title,
        description,
        author,
        imageURL,
        createdAt: new Date(),
      });
  
      await newPost.save();
      res.status(201).json({ message: 'Publicación creada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la publicación.' });
    }
  };
  
  // Controlador para la eliminación de publicaciones
  const ctrlDeletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await PostModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Publicación no encontrada.' });
      }
  
      // Verificar que el usuario que solicita la eliminación sea el autor de la publicación
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para eliminar esta publicación.' });
      }
  
      await PostModel.deleteOne({ _id: postId }); 
      res.status(200).json({ message: 'Publicación eliminada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la publicación.' });
    }
  };

  // Controlador para la edición de publicaciones (puedes adaptarlo según tus necesidades)
const ctrlEditPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { title, description, imageURL } = req.body;
  
      const post = await PostModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Publicación no encontrada.' });
      }
  
      // Verificar que el usuario que solicita la edición sea el autor de la publicación
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para editar esta publicación.' });
      }
  
      post.title = title;
      post.description = description;
      post.imageURL = imageURL;
  
      await post.save();
      res.status(200).json({ message: 'Publicación editada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al editar la publicación.' });
    }
  };

  const ctrlGetPostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await PostModel.findById(postId).populate('author', 'username avatarURL').populate({
            path: 'comments',
            populate: { path: 'author', select: 'username avatarURL' },
        });
  
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado.' });
        }
  
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el post.' });
    }
  };


  export {
    ctrlGetPosts,
    ctrlCreatePost,
    ctrlDeletePost,
    ctrlEditPost,
    ctrlGetPostById
}