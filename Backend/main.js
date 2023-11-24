import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const app = express()



// middlewares comunes
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())


// midlewares
app.use(express.json())

// roures
app.get('/', (req, res)=> {
    res.send('Hello Word')
})

const PORT = process.env.PORT || 3001


// server settings
app.listen(PORT, ()=> {
    console.log(`Bienvenido al puerto ${PORT}`);    
})