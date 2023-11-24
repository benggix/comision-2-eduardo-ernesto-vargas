import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { userRouter } from './src/routes/user.routes.js'

const app = express()



// middlewares comunes
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())


// midlewares
app.use(express.json())

// routes
app.use('/users', userRouter)
app.use('/', (req, res)=> {
    res.send('Bienvenido a la pagina')
})


const PORT = process.env.PORT || 3001


// server settings
app.listen(PORT, ()=> {
    console.log(`Bienvenido al puerto ${PORT}`);    
})