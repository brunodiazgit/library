import express from "express"
import cors from "cors"
import pkg from "pg"

import libraryRoutes from "./db/routes/libraryRoutes.js"

console.log("Inicializando api")
console.log("Conectadose al servidor...")

const app = express()
const puerto = 3100 

app.use(cors())
app.use(express.json())


const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Libreria',
    password: 'Santana1!',
    port: 5432,
})

app.use('/api/books', libraryRoutes(pool))

app.listen(puerto, ()=>{
    console.log("Corriendo servidor en el puerto: " + puerto)
})