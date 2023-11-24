import {Router} from 'express'


const userRouter = Router()



// Rutas públicas
userRouter.post('/register', (req, res)=> {
    res.send('crear usuario')
});
userRouter.post('/login',  (req, res)=> {
    res.send('inicio de sesion')
});
userRouter.get('/posts',  ()=> {
    res.send('Post')
});

// Middleware de autenticación para las rutas privadas

// Rutas privadas
userRouter.post('/posts', ()=> {
    res.send('Crear Post')
});
userRouter.delete('/posts/:postId', ()=> {
    res.send('Eliminar post')
});
userRouter.post('/comments/:postId', ()=> {
    res.send('Comentar Post')
});
userRouter.delete('/comments/:commentId', ()=> {
    res.send('Eliminar comentario del Post')
});



export {userRouter}