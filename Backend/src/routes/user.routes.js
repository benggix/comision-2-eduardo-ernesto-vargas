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
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/posts', getPosts);

// Middleware de autenticación para las rutas privadas
userRouter.use(authMiddleware);


// Rutas privadas
userRouter.post('/posts', createPost);
userRouter.put('/posts/:postId', editPost); // Editar una publicación
userRouter.delete('/posts/:postId', deletePost);
userRouter.post('/comments/:postId', createComment);
userRouter.put('/comments/:commentId', editComment); // Editar un comentario
userRouter.delete('/comments/:commentId', deleteComment);


export {userRouter}