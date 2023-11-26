import {Router} from 'express'
import {authMiddleware} from '../middleware/authentication.js'
import {registerUser, loginUser,} from "../controllers/user.controller.js";
import {
    createPost,
    deletePost,
    getPosts,
    editPost, } from '../controllers/post.controller.js'
import {
    createComment,
    deleteComment,
    editComment,} from '../controllers/comment.controller.js'



const userRouter = Router()


// Rutas públicas
userRouter.post('/register', registerUser); // Craer usuario
userRouter.post('/login', loginUser);       // Iniciar sesion
userRouter.get('/posts', getPosts);         // obtener los posts

// Middleware de autenticación para las rutas privadas
userRouter.use(authMiddleware);


// Rutas privadas
userRouter.post('/posts', createPost);      // Crear post
userRouter.put('/posts/:postId', editPost); // Editar una publicación
userRouter.delete('/posts/:postId', deletePost);    // Eliminar Post
userRouter.post('/comments/:postId', createComment);  // Crear comentario
userRouter.put('/comments/:commentId', editComment); // Editar un comentario
userRouter.delete('/comments/:commentId', deleteComment);   // Eliminar comentario


export {userRouter}