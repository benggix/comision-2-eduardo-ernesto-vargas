import {Router} from 'express'
import {authMiddleware} from '../middleware/authentication.js'
import {ctrlRegisterUser, ctrlLoginUser,} from "../controllers/user.controller.js";
import {
    ctrlCreatePost,
    ctrlDeletePost,
    ctrlGetPosts,
    ctrlEditPost, } from '../controllers/post.controller.js'
import {
    ctrlCreateComment,
    ctrlDeleteComment,
    ctrlEditComment,} from '../controllers/comment.controller.js'



const userRouter = Router()


// Rutas públicas
userRouter.post('/register', ctrlRegisterUser); // Craer usuario
userRouter.post('/login', ctrlLoginUser);       // Iniciar sesion
userRouter.get('/posts', ctrlGetPosts);         // obtener los posts

// Middleware de autenticación para las rutas privadas
userRouter.use(authMiddleware);


// Rutas privadas
userRouter.post('/posts', ctrlCreatePost);      // Crear post
userRouter.put('/posts/:postId', ctrlEditPost); // Editar una publicación
userRouter.delete('/posts/:postId', ctrlDeletePost);    // Eliminar Post
userRouter.post('/comments/:postId', ctrlCreateComment);  // Crear comentario
userRouter.put('/comments/:commentId', ctrlEditComment); // Editar un comentario
userRouter.delete('/comments/:commentId', ctrlDeleteComment);   // Eliminar comentario


export {userRouter}