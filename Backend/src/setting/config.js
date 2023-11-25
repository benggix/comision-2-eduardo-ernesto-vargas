import {config as dotenv} from "dotenv"                     // le cambie el nombre, asi le puedo llamar a mi constante "config" pq sino tendria 2 variables con el mismo nombre.
dotenv()

export const config = {
    port: process.env.PORT || 4000,                          // EL PORT en mayusculas pq en mi archivo ".env" tenemos "PORT: 3001".
    mongo_uri: process.env.MONGO_URI 
}