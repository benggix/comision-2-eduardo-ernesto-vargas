import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { userRouter } from './src/routes/user.routes.js'
import { config } from "./src/setting/config.js"
import { startConnection } from "./src/setting/database.js"
import {authMiddleware} from './src/middleware/authentication.js'
import { postRouter } from './src/routes/post.routes.js'
import { commentRouter } from './src/routes/comment.routes.js'

const app = express()



// middlewares comunes
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())


// midlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Middleware para manejar solicitudes OPTIONS
app.options('*', (req, res) => {
    res.status(200).send();
  });

// routes
app.use('/users', userRouter)
app.use('/posts' ,postRouter)
app.use('/comments', authMiddleware ,commentRouter)
app.use('/', (req, res)=> {
    res.send('Bienvenido a la pagina')
})




// server settings
app.listen(config.port, async ()=> {
    await startConnection();
    
    console.log(`Server running on port ${config.port}`);
  
  })