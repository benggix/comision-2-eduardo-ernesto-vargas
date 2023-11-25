import {Router} from 'express'
import {authMiddleware} from '../middleware/authentication.js'
import {
    registerUser,
    loginUser,
    createPost,
    deletePost,
    getPosts,
    createComment,
    deleteComment,
    editPost,
    editComment,} from "../controllers/user.controller.js";

const userRouter = Router()


// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/posts', getPosts);

// Middleware de autenticación para las rutas privadas
router.use(authMiddleware);


// Rutas privadas
router.post('/posts', createPost);
router.put('/posts/:postId', editPost); // Editar una publicación
router.delete('/posts/:postId', deletePost);
router.post('/comments/:postId', createComment);
router.put('/comments/:commentId', editComment); // Editar un comentario
router.delete('/comments/:commentId', deleteComment);


export {userRouter}