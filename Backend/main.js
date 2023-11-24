import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { userRouter } from './src/routes/user.routes.js'
import { config } from "./src/setting/config.js"
import { startConnection } from "./src/setting/database.js"

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




// server settings
app.listen(config.port, async ()=> {
    await startConnection();
    
    console.log(`Server running on port ${config.port}`);
  
  })